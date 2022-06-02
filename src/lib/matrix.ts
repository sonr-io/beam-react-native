import { MATRIX_NETWORK_BASE_URL } from "@env";
import { memoize } from "lodash";
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
import { User } from "../types/User";

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

const msgTypesToRender = new Set(["m.text", "m.reply", "m.forward"]);

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
    const reactions = room.timeline
      .filter((event) => event.getContent().msgtype === "m.reaction")
      .map((event) => ({
        messageId: event.getContent().messageId,
        emoji: event.getContent().emoji,
      }));
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
          .filter((event) =>
            msgTypesToRender.has(event.getContent().msgtype ?? "")
          )
          .map((event) => {
            const sender = {
              id: event.getSender(),
              name: members.get(event.getSender()) ?? event.getSender(),
              isOnline: false,
            };
            return {
              id: event.getId(),
              text: event.getContent().body,
              timestamp: event.getTs(),
              sender,
              parentId: event.getContent().parentId,
              forwardedFrom: event.getContent().forwardedFrom,
              reactions: reactions
                .filter((reaction) => reaction.messageId === event.getId())
                .map((reaction) => ({ emoji: reaction.emoji, user: sender })),
            };
          }),
      ],
    };
  });
};

type OnMessageCallback = (params: {
  messageId: string;
  roomId: string;
  message: string;
  sender: string;
  parentId?: string;
  forwardedFrom?: string;
}) => void;

type OnReactionCallback = (params: {
  roomId: string;
  messageId: string;
  sender: string;
  emoji: string;
}) => void;

export const onReceiveMessage = (
  client: MatrixClient,
  onMessage: OnMessageCallback,
  onReaction: OnReactionCallback
) => {
  const privateRooms = getPrivateRooms(client);
  privateRooms.forEach((room) => {
    room.on(RoomEvent.Timeline, (event) => {
      if (
        event.getType() === EventType.RoomMessage &&
        event.getSender() !== client.getUserId()
      ) {
        if (event.getContent().msgtype === "m.reaction") {
          onReaction({
            roomId: room.roomId,
            messageId: event.getContent().messageId,
            sender: event.getSender(),
            emoji: event.getContent().emoji,
          });
        } else {
          onMessage({
            messageId: event.getId(),
            roomId: room.roomId,
            message: event.getContent().body,
            sender: event.getSender(),
            parentId: event.getContent().parentId,
            forwardedFrom: event.getContent().forwardedFrom,
          });
        }
      }
    });
  });
};

export const getUser = memoize(
  (client: MatrixClient, userId: string): User => {
    const { displayName } = client.getUser(userId);
    return {
      id: userId,
      name: displayName,
      isOnline: false,
    };
  },
  (client, userId) => `${client.getUserId()}${userId}`
);
