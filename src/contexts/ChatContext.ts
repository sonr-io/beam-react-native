import { createContext, useContext } from "react";

import { Chat } from "../types/Chat";

export type ChatContextType = {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addMessage: (chatId: string, message: string) => void;
  addReaction: (chatId: string, messageId: string, emoji: string) => void;
};

export const ChatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  addReaction: () => {},
});
export const useChatContext = () => useContext(ChatContext);
