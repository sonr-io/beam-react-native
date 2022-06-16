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

import { Chat, Message, User } from "../types/Chat";
import nameFromMatrixId from "./nameFromMatrixId";

export const login = async (user: string, password: string) => {
  client.stopClient();
  await client.clearStores();
  try {
    await client.loginWithPassword(user, password);
  } catch {
    return;
  }
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

const getChatFromRoom = async (room: Room): Promise<Chat> => {
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

  const messages = await Promise.all([
    ...room.timeline
      .filter((event) => event.getContent().msgtype === "m.text")
      .map(async (event) => {
        const sender = await getUser(event.getSender());
        return {
          id: event.getId(),
          text: event.getContent().body,
          timestamp: event.getTs(),
          sender,
          parentId: event.getContent().parentId,
          parentSender: event.getContent().parentSender,
          parentText: event.getContent().parentText,
          forwardedFrom: event.getContent().forwardedFrom,
          reactions: reactions
            .filter((reaction) => reaction.messageId === event.getId())
            .map((reaction) => ({ emoji: reaction.emoji, user: sender })),
        };
      }),
  ]);

  const lastEvent = [...room.timeline]
    .reverse()
    .find(
      (event) =>
        event.getContent().msgtype === "m.text" ||
        event.getContent().msgtype === "m.reaction"
    );

  const preview = lastEvent
    ? lastEvent?.getContent().msgtype === "m.reaction"
      ? {
          text: lastEvent.getContent().parentText,
          label: `Reacted: ${lastEvent.getContent().emoji}`,
        }
      : { text: lastEvent.getContent().body }
    : null;

  return {
    id: room.roomId,
    user: {
      id: interlocutor.userId,
      name: nameFromMatrixId(interlocutor.userId),
      isOnline: false,
    },
    lastSeen: 0,
    isMember: room.getMyMembership() === "join",
    messages,
    preview,
    lastActivity: room.getLastActiveTimestamp(),
  };
};

export const getChats = () => {
  return Promise.all(getPrivateRooms().map((room) => getChatFromRoom(room)));
};

export const scrollbackRoom = async (roomId: string) => {
  const room = client.getRoom(roomId);
  if (room && room.oldState.paginationToken) {
    await client.scrollback(room);
    return getChatFromRoom(room);
  } else {
    return null;
  }
};

export type OnMessageCallback = (params: {
  messageId: string;
  roomId: string;
  message: string;
  sender: User;
  parentId?: string;
  parentSender?: User;
  parentText?: string;
  forwardedFrom?: string;
}) => void;

export type OnReactionCallback = (params: {
  roomId: string;
  messageId: string;
  sender: User;
  emoji: string;
}) => void;

export const onReceiveMessage = (
  onMessage: OnMessageCallback,
  onReaction: OnReactionCallback,
  roomId?: string
) => {
  if (roomId) {
    _onReceiveMessage(onMessage, onReaction, roomId);
  } else {
    const privateRooms = getPrivateRooms();
    privateRooms.forEach((room) => {
      _onReceiveMessage(onMessage, onReaction, room.roomId);
    });
  }
};

const _onReceiveMessage = (
  onMessage: OnMessageCallback,
  onReaction: OnReactionCallback,
  roomId: string
) => {
  client.on(ClientEvent.Event, async (event) => {
    const isMessage = event.getType() === EventType.RoomMessage;
    const isDifferentRoom = event.getRoomId() !== roomId;
    if (!isMessage || isDifferentRoom) return;

    if (event.getContent().msgtype === "m.reaction") {
      onReaction({
        roomId: roomId,
        messageId: event.getContent().messageId,
        sender: await getUser(event.getSender()),
        emoji: event.getContent().emoji,
      });
    } else {
      onMessage({
        messageId: event.getId(),
        roomId: roomId,
        message: event.getContent().body,
        sender: await getUser(event.getSender()),
        parentId: event.getContent().parentId,
        parentSender: event.getContent().parentSender,
        parentText: event.getContent().parentText,
        forwardedFrom: event.getContent().forwardedFrom,
      });
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
      const user = await getUser(event.getSender());
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
  async (userId: string): Promise<User> => {
    const { displayname } = await client.getProfileInfo(userId);
    return {
      id: userId,
      name: displayname ?? "",
      isOnline: false,
    };
  },
  (userId) => `${client.getUserId()}${userId}`
);
