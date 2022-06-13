import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import {
  OnMessageCallback,
  OnReactionCallback,
  onReceiveMessage,
  onNewChat,
  scrollbackRoom,
} from "./matrix";

export const useListeners = () => {
  const { addMessage, addReactionToMessage, setChats } = useChatContext();
  const [initialListenersAdded, setInitialListenersAdded] = useState(false);

  const onMessage: OnMessageCallback = ({
    messageId: id,
    roomId: chatId,
    message,
    sender,
    parentId,
    parentSender,
    parentText,
    forwardedFrom,
  }) => {
    addMessage({
      id,
      chatId,
      message,
      sender,
      parentId,
      parentSender,
      parentText,
      forwardedFrom,
    });
  };

  const onReaction: OnReactionCallback = ({
    roomId,
    messageId,
    sender,
    emoji,
  }) => {
    addReactionToMessage(roomId, messageId, sender, emoji);
  };

  const addListeners = () => {
    if (!initialListenersAdded) {
      // only add listeners one time to avoid receiving repeated messages
      onReceiveMessage(onMessage, onReaction);
      onNewChat(({ id, name, user, room }) => {
        addRoomListeners(room.roomId);
        setChats((chats) => {
          chats.push({
            id,
            lastSeen: 0,
            messages: [],
            name,
            isMember: false,
            user,
          });
          return [...chats];
        });
      });
      setInitialListenersAdded(true);
    }
  };

  const addRoomListeners = (roomId: string) => {
    onReceiveMessage(onMessage, onReaction, roomId);
  };

  return { addListeners, addRoomListeners };
};

export const useScrollback = (roomId: string) => {
  const { setChats } = useChatContext();

  const scrollback = async () => {
    const chat = await scrollbackRoom(roomId);
    if (chat) {
      setChats((chats) => {
        const index = chats.findIndex((_chat) => _chat.id === chat.id);
        chats[index] = chat;
        return [...chats];
      });
    }
  };

  return { scrollback };
};
