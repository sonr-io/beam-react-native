import { createContext, useContext } from "react";

import { Chat } from "../types/Chat";
import { Emoji } from "../types/Emoji";
import { User } from "../types/User";

export type ChatContextType = {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addMessage: (params: {
    id: string;
    chatId: string;
    message: string;
    sender: User;
    parentId?: string;
    forwardedFrom?: string;
  }) => void;
  addReaction: (chatId: string, messageId: string, emoji: Emoji) => void;
  addReactionToMessage: (
    chatId: string,
    messageId: string,
    user: User,
    emoji: string
  ) => void;
};

export const ChatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  addReaction: () => {},
  addReactionToMessage: () => {},
});
export const useChatContext = () => useContext(ChatContext);
