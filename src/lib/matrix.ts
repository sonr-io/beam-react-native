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

export const getChats = async (client: MatrixClient): Promise<Chat[]> => {
  const privateRooms = getPrivateRooms(client);
  const members = new Map<string, string>();
  for (const room of privateRooms) {
    room
      .getMembers()
      .forEach((member) => members.set(member.userId, member.name));
    // load all events
    while (room.oldState.paginationToken) {
      await client.scrollback(room);
    }
  }

  return privateRooms.map((room) => {
    // we know that there are at least 2 members, so this will always find a user
    const interlocutor = room
      .getMembers()
      .find((member) => member.userId !== room.myUserId)!;
    return {
      id: room.roomId,
      name: interlocutor.name,
      user: {
        id: interlocutor.userId,
        name: interlocutor.name,
        isOnline: false,
      },
      lastSeen: 0,
      isMember: room.getMyMembership() === "join",
      messages: [
        ...room.timeline
          .filter((event) => event.getType() === EventType.RoomMessage)
          .map((event) => ({
            id: event.getId(),
            text: event.getContent().body,
            timestamp: event.getTs(),
            sender: {
              id: event.getSender(),
              name: members.get(event.getSender()) ?? event.getSender(),
              isOnline: false,
            },
            parentId: event.getContent().parentId,
            forwardedFrom: event.getContent().forwardedFrom,
            reactions: [],
          })),
      ],
    };
  });
};

type Callback = (params: {
  roomId: string;
  message: string;
  sender: string;
  parentId?: string;
  forwardedFrom?: string;
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
          forwardedFrom: event.getContent().forwardedFrom,
        });
      }
    });
  });
};
