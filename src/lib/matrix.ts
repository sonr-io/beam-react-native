import { MATRIX_NETWORK_BASE_URL } from "@env";
import {
  ClientEvent,
  createClient,
  JoinRule,
  MatrixClient,
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

export const getChats = (client: MatrixClient): Chat[] => {
  const privateRooms = client
    .getRooms()
    .filter(
      (room) =>
        room.getJoinRule() === JoinRule.Invite && room.getMembers().length === 2
    );
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
      {
        id: "1",
        text: "last message placeholder",
        timestamp: 0,
        sender: {
          id: room.name,
          name: room.name,
          isOnline: false,
        },
        reactions: [],
      },
    ],
  }));
};
