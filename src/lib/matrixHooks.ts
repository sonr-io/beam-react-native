import { useChatContext } from "../contexts/ChatContext";
import {
  OnMessageCallback,
  OnReactionCallback,
  onReceiveMessage,
  onNewChat,
  clearListeners,
  scrollbackRoom,
} from "./matrix";

export const useListeners = () => {
  const { addMessage, addReactionToMessage, setChats } = useChatContext();

  const onMessage: OnMessageCallback = addMessage;

  const onReaction: OnReactionCallback = addReactionToMessage;

  const addListeners = () => {
    onReceiveMessage(onMessage, onReaction);
    onNewChat(({ id, user, room }) => {
      addRoomListeners(room.roomId);
      setChats((chats) => {
        chats.push({
          id,
          lastOpen: 0,
          messages: [],
          isMember: false,
          user,
          preview: null,
          lastActivity: Date.now(),
        });
        return [...chats];
      });
    });
  };

  const addRoomListeners = (roomId: string) => {
    onReceiveMessage(onMessage, onReaction, roomId);
  };

  const removeListeners = () => {
    clearListeners();
  };

  return { addListeners, addRoomListeners, removeListeners };
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
