import { MATRIX_NETWORK_BASE_URL } from "@env";
import {
  ClientEvent,
  createClient,
  EventType,
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
    client.once(ClientEvent.Sync, (state) => {
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

export const getChats = async (
  client: MatrixClient
): Promise<{ chats: Chat[]; members: Map<string, string> }> => {
  const privateRooms = getPrivateRooms(client);
  const members: [string, string][] = [];
  for (const room of privateRooms) {
    room
      .getMembers()
      .forEach((member) => members.push([member.userId, member.name]));
    // load all events
    while (room.oldState.paginationToken) {
      await client.scrollback(room);
    }
  }

  return {
    chats: privateRooms
      .map((room) => {
        const interlocutor = room
          .getMembers()
          .filter((member) => member.userId !== room.myUserId)[0];
        return {
          id: room.roomId,
          name: interlocutor.name,
          member: interlocutor.userId,
          timeline: room.timeline,
        };
      })
      .map((room) => ({
        id: room.id,
        name: room.name,
        user: {
          id: room.name,
          name: room.name,
          isOnline: false,
        },
        lastSeen: 0,
        messages: [
          ...room.timeline
            .filter((event) => event.getType() === EventType.RoomMessage)
            .map((event) => ({
              id: event.getId(),
              text: event.getContent().body,
              timestamp: event.getTs(),
              sender: {
                id: event.getSender(),
                name: event.getSender(),
                isOnline: false,
              },
              parentId: event.getContent().parentId,
              reactions: [],
            })),
        ],
      })),
    members: new Map(members),
  };
};

type Callback = (params: {
  roomId: string;
  message: string;
  sender: string;
  parentId?: string;
}) => void;

export const onReceiveMessage = (client: MatrixClient, callback: Callback) => {
  const privateRooms = getPrivateRooms(client);
  privateRooms.forEach((room) => {
    room.on(RoomEvent.Timeline, (event) => {
      if (
        event.getType() === EventType.RoomMessage &&
        event.getSender() !== client.getUserId()
      ) {
        callback({
          roomId: room.roomId,
          message: event.getContent().body,
          sender: event.getSender(),
          parentId: event.getContent().parentId,
        });
      }
    });
  });
};
