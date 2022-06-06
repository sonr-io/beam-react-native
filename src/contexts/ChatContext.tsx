import React, { createContext, useContext, useState } from "react";

import { useUserContext } from "./UserContext";
import { useEmojiHistoryContext } from "./EmojiHistoryContext";
import { charFromEmojiObject } from "../lib/emoji";

import { Chat } from "../types/Chat";
import { Emoji } from "../types/Emoji";
import { User } from "../types/User";

type ChatContextType = {
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

const ChatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  addReaction: () => {},
  addReactionToMessage: () => {},
});
export const useChatContext = () => useContext(ChatContext);

type Props = {
  chats: Chat[];
};
export const ChatContextProvider: React.FC<Props> = ({
  chats: _chats,
  children,
}) => {
  const [chats, setChats] = useState(_chats);
  const { user } = useUserContext();
  const { addEmojiToHistory } = useEmojiHistoryContext();

  const addMessage = ({
    id,
    chatId,
    message,
    parentId,
    forwardedFrom,
    sender,
  }: {
    id: string;
    chatId: string;
    message: string;
    sender: User;
    parentId?: string;
    forwardedFrom?: string;
  }) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        chat.messages.push({
          id,
          text: message,
          timestamp: new Date().getTime(),
          sender,
          reactions: [],
          parentId,
          forwardedFrom,
        });
        return chat;
      })
    );
  };

  const addReaction = (chatId: string, messageId: string, emoji: Emoji) => {
    if (user) {
      addEmojiToHistory(emoji);
      const emojiChar = charFromEmojiObject(emoji);
      addReactionToMessage(chatId, messageId, user, emojiChar);
    }
  };

  const addReactionToMessage = (
    chatId: string,
    messageId: string,
    user: User,
    emojiChar: string
  ) => {
    setChats((chats) => {
      const chat = chats.find((chat) => chat.id === chatId);

      if (chat) {
        const i = chat.messages.findIndex((m) => m.id === messageId);
        const reactionIndex = chat.messages[i].reactions.findIndex(
          (e) => e.user.id === user.id && e.emoji === emojiChar
        );
        if (reactionIndex >= 0) {
          chat.messages[i].reactions.splice(reactionIndex, 1);
        } else {
          chat.messages[i].reactions.unshift({ emoji: emojiChar, user });
        }
      }

      return [...chats];
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        addMessage,
        addReaction,
        addReactionToMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
