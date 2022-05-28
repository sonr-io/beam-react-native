import { MATRIX_NETWORK_BASE_URL } from "@env";
import {
  ClientEvent,
  createClient,
  JoinRule,
  MatrixClient,
  Room,
  RoomEvent,
} from "matrix-js-sdk";
import { SyncState } from "matrix-js-sdk/lib/sync";
import request from "xmlhttp-request";
import { MatrixLoginType } from "../Constants/Matrix";

import { Chat } from "../types/Chat";

export const login = async (user: string, password: string) => {
  const response = await fetch(
    `${MATRIX_NETWORK_BASE_URL}/_matrix/client/r0/login`,
    {
      method: "POST",
      body: JSON.stringify({
        type: MatrixLoginType.LoginPassword,
        user,
        password,
      }),
    }
  );
  const { user_id: userId, access_token: accessToken } = await response.json();

  if (!userId || !accessToken) {
    throw new Error("login failed");
  }

  const client = createClient({
    baseUrl: MATRIX_NETWORK_BASE_URL,
    request,
    userId,
    accessToken,
    localTimeoutMs: 5000,
  });
  const result = new Promise<MatrixClient>((resolve) => {
    client.on(ClientEvent.Sync, (state) => {
      if (state === SyncState.Prepared) {
        resolve(client);
      }
    });
  });
  await client.startClient();

  return result;
};

const getPrivateRooms = (client: MatrixClient): Room[] => {
  return client
    .getRooms()
    .filter(
      (room) =>
        room.getJoinRule() === JoinRule.Invite && room.getMembers().length === 2
    );
};

export const getChats = (client: MatrixClient): Chat[] => {
  const privateRooms = getPrivateRooms(client);
  return privateRooms.map((room) => ({
    id: room.roomId,
    name: room.name,
    user: {
      id: room.name,
      name: room.name,
      isOnline: false,
    },
    lastSeen: 0,
    messages: [
      ...room.timeline
        .filter((event) => event.getType() === "m.room.message")
        .map((event) => ({
          id: event.getId(),
          text: event.getContent().body,
          timestamp: event.getTs(),
          sender: {
            id: event.getSender(),
            name: event.getSender(),
            isOnline: false,
          },
          reactions: [],
        })),
    ],
  }));
};

type Callback = (roomId: string, message: string, sender: string) => void;

export const onReceiveMessage = (client: MatrixClient, callback: Callback) => {
  const privateRooms = getPrivateRooms(client);
  privateRooms.forEach((room) => {
    room.on(RoomEvent.Timeline, (event) => {
      if (
        event.getType() === "m.room.message" &&
        event.getSender() !== client.getUserId()
      ) {
        callback(room.roomId, event.getContent().body, event.getSender());
      }
    });
  });
};
