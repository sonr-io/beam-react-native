import { memoize, chain } from "lodash";
import {
  ClientEvent,
  EventType,
  JoinRule,
  MatrixClient,
  MatrixEvent,
  Room,
  RoomMemberEvent,
} from "matrix-js-sdk";
import { SyncState } from "matrix-js-sdk/lib/sync";
import { getClient } from "../matrixClient";

import { Chat, Reaction, User } from "../types/Chat";
import nameFromMatrixId from "./nameFromMatrixId";

export const login = async (user: string, password: string) => {
  const client = getClient();
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

export const logout = async () => {
  const client = getClient();
  client.stopClient();
  await client.clearStores();
  await client.logout();
};

const getPrivateRooms = (): Room[] => {
  const client = getClient();
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

  const reactions = chain(room.timeline)
    .filter((event) => event.getContent().msgtype === "m.reaction")
    .groupBy((event) =>
      [
        event.getSender(),
        event.getContent().messageId,
        event.getContent().emoji,
      ].join()
    )
    .filter((group) => group.length % 2 === 1)
    .map(([event]): Reaction => {
      const sender = {
        id: event.getSender(),
        name: nameFromMatrixId(event.getSender()),
      };
      return {
        id: event.getId(),
        emoji: event.getContent().emoji,
        sender,
        parentId: event.getContent().messageId,
      };
    })
    .groupBy("parentId")
    .valueOf();

  const lastOpen = await scrollbackToLastOpen(room);
  const messages = [
    ...room.timeline
      .filter((event) => event.getContent().msgtype === "m.text")
      .map((event) => {
        const sender = {
          id: event.getSender(),
          name: nameFromMatrixId(event.getSender()),
        };
        return {
          id: event.getId(),
          text: event.getContent().body,
          timestamp: event.getTs(),
          sender,
          parentId: event.getContent().parentId,
          parentSender: event.getContent().parentSender,
          parentText: event.getContent().parentText,
          forwardedFrom: event.getContent().forwardedFrom,
          reactions: reactions[event.getId()] || [],
        };
      }),
  ];

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
    },
    isMember: room.getMyMembership() === "join",
    messages,
    preview,
    lastOpen,
    lastActivity:
      room.getLastActiveTimestamp() > 0 ? room.getLastActiveTimestamp() : 0,
  };
};

export const getChats = () => {
  return Promise.all(getPrivateRooms().map((room) => getChatFromRoom(room)));
};

export const scrollbackRoom = async (roomId: string) => {
  const client = getClient();
  const room = client.getRoom(roomId);
  if (room && room.oldState.paginationToken) {
    await client.scrollback(room);
    return getChatFromRoom(room);
  } else {
    return null;
  }
};

const scrollbackToLastOpen = async (room: Room) => {
  const client = getClient();
  const eventId = room.accountData["m.fully_read"]?.getContent().event_id;

  if (!eventId) {
    return 0;
  }

  const predicate = (event: MatrixEvent) => event.getId() === eventId;

  let event = room.timeline.find(predicate);
  while (!event && room.oldState.paginationToken) {
    await client.scrollback(room);
    event = room.timeline.find(predicate);
  }

  return event?.getTs() ?? 0;
};

export type OnMessageCallback = (params: {
  id: string;
  chatId: string;
  message: string;
  sender: User;
  parentId?: string;
  parentSender?: User;
  parentText?: string;
  forwardedFrom?: string;
}) => void;

export type OnReactionCallback = (params: {
  id: string;
  chatId: string;
  messageId: string;
  sender: User;
  emojiChar: string;
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
  getClient().on(ClientEvent.Event, (event) => {
    const isMessage = event.getType() === EventType.RoomMessage;
    const isDifferentRoom = event.getRoomId() !== roomId;
    if (!isMessage || isDifferentRoom) return;

    const user = {
      id: event.getSender(),
      name: nameFromMatrixId(event.getSender()),
    };

    if (event.getContent().msgtype === "m.reaction") {
      onReaction({
        id: event.getId(),
        chatId: roomId,
        messageId: event.getContent().messageId,
        sender: user,
        emojiChar: event.getContent().emoji,
      });
    } else {
      onMessage({
        id: event.getId(),
        chatId: roomId,
        message: event.getContent().body,
        sender: user,
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
  const client = getClient();
  client.on(RoomMemberEvent.Membership, async (event, member) => {
    if (
      member.membership === "invite" &&
      member.userId === client.getUserId()
    ) {
      const user = await getUser(event.getSender());
      user.name = nameFromMatrixId(user.id);
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

export const clearListeners = () => {
  getClient().removeAllListeners(RoomMemberEvent.Membership);
  getClient().removeAllListeners(ClientEvent.Event);
};

export const getUser = memoize(
  async (userId: string): Promise<User> => {
    const { displayname } = await getClient().getProfileInfo(userId);
    return {
      id: userId,
      name: displayname ?? "",
    };
  },
  (userId) => `${getClient().getUserId()}${userId}`
);

export const markLastMessageAsRead = async (roomId: string) => {
  const client = getClient();
  const room = client.getRoom(roomId);
  if (room) {
    const lastEvent = room.timeline[room.timeline.length - 1];
    // @ts-ignore (matrix types not up to date with implementation)
    await client.setRoomReadMarkers(roomId, lastEvent.getId());
  }
};
