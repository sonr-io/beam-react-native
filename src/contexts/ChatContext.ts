import { createContext, useContext } from "react";

import { Chat } from "../types/Chat";
import { Emoji } from "../types/Emoji";

export type ChatContextType = {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addMessage: (chatId: string, message: string, parentId?: string) => void;
  addReaction: (chatId: string, messageId: string, emoji: Emoji) => void;
};

export const ChatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  addReaction: () => {},
});
export const useChatContext = () => useContext(ChatContext);
