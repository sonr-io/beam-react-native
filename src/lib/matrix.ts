import { memoize } from "lodash";
import {
  ClientEvent,
  EventType,
  JoinRule,
  MatrixClient,
  Room,
  RoomEvent,
  RoomMemberEvent,
} from "matrix-js-sdk";
import { SyncState } from "matrix-js-sdk/lib/sync";
import { client } from "../matrixClient";

import { Chat } from "../types/Chat";
import { User } from "../types/User";

export const login = async (user: string, password: string) => {
  client.stopClient();
  await client.clearStores();
  await client.loginWithPassword(user, password);
  await client.startClient();

  return new Promise<MatrixClient>((resolve) => {
    client.once(ClientEvent.Sync, (state) => {
      if (state === SyncState.Prepared) {
        resolve(client);
      }
    });
  });
};

const getPrivateRooms = (): Room[] => {
  return client
    .getRooms()
    .filter(
      (room) =>
        room.getJoinRule() === JoinRule.Invite && room.getMembers().length === 2
    );
};

const msgTypesToRender = new Set(["m.text", "m.reply", "m.forward"]);

export const getChats = async (): Promise<Chat[]> => {
  const privateRooms = getPrivateRooms();
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

export type OnMessageCallback = (params: {
  messageId: string;
  roomId: string;
  message: string;
  sender: string;
  parentId?: string;
  forwardedFrom?: string;
}) => void;

export type OnReactionCallback = (params: {
  roomId: string;
  messageId: string;
  sender: string;
  emoji: string;
}) => void;

export const onReceiveMessage = (
  onMessage: OnMessageCallback,
  onReaction: OnReactionCallback,
  room?: Room
) => {
  if (room) {
    _onReceiveMessage(onMessage, onReaction, room);
  } else {
    const privateRooms = getPrivateRooms();
    privateRooms.forEach((room) => {
      _onReceiveMessage(onMessage, onReaction, room);
    });
  }
};

export const _onReceiveMessage = (
  onMessage: OnMessageCallback,
  onReaction: OnReactionCallback,
  room: Room
) => {
  client.on(RoomEvent.Timeline, (event) => {
    if (
      event.getRoomId() === room.roomId &&
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
};

type NewChatCallback = (params: {
  id: string;
  name: string;
  user: User;
  room: Room;
}) => void;

export const onNewChat = (callback: NewChatCallback) => {
  client.on(RoomMemberEvent.Membership, async (event, member) => {
    if (
      member.membership === "invite" &&
      member.userId === client.getUserId()
    ) {
      const user = getUser(client, event.getSender());
      const roomId = member.roomId;
      const room = await client.joinRoom(roomId);
      callback({
        id: roomId,
        name: user.name,
        user,
        room,
      });
    }
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
