import React, { createContext, useContext, useState } from "react";

import { useUserContext } from "./UserContext";
import { useEmojiHistoryContext } from "./EmojiHistoryContext";
import { charFromEmojiObject } from "../lib/emoji";

import { Chat, User } from "../types/Chat";
import { Emoji } from "../types/Emoji";

type AddMessage = (params: {
  id: string;
  chatId: string;
  message: string;
  sender: User;
  parentId?: string;
  parentSender?: User;
  parentText?: string;
  forwardedFrom?: string;
}) => void;

type AddReaction = (params: {
  id: string;
  chatId: string;
  messageId: string;
  emoji: Emoji;
}) => void;

type AddReactionToMessage = (params: {
  id: string;
  chatId: string;
  messageId: string;
  sender: User;
  emojiChar: string;
}) => void;

type ChatContextType = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  addMessage: AddMessage;
  addReaction: AddReaction;
  addReactionToMessage: AddReactionToMessage;
  updateLastOpen: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  addReaction: () => {},
  addReactionToMessage: () => {},
  updateLastOpen: () => {},
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

  const addMessage: AddMessage = ({
    id,
    chatId,
    message: text,
    parentId,
    parentSender,
    parentText,
    forwardedFrom,
    sender,
  }) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) return chat;

        chat.messages.push({
          id,
          text,
          timestamp: new Date().getTime(),
          sender,
          reactions: [],
          parentId,
          parentSender,
          parentText,
          forwardedFrom,
        });

        if (Date.now() > chat.lastActivity) {
          chat.lastActivity = Date.now();
          chat.preview = { text };
        }

        return chat;
      })
    );
  };

  const addReaction: AddReaction = ({ id, chatId, messageId, emoji }) => {
    addEmojiToHistory(emoji);
    const emojiChar = charFromEmojiObject(emoji);
    addReactionToMessage({ id, chatId, messageId, sender: user, emojiChar });
  };

  const addReactionToMessage: AddReactionToMessage = ({
    id,
    chatId,
    messageId,
    sender,
    emojiChar,
  }) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) return chat;

        const i = chat.messages.findIndex((m) => m.id === messageId);
        if (i < 0) return chat;

        const reactionIndex = chat.messages[i].reactions.findIndex(
          (e) => e.sender.id === sender.id && e.emoji === emojiChar
        );
        if (reactionIndex >= 0) {
          chat.messages[i].reactions.splice(reactionIndex, 1);
          return chat;
        }

        chat.messages[i].reactions.unshift({
          id,
          emoji: emojiChar,
          sender: user,
          parentId: messageId,
        });

        if (Date.now() > chat.lastActivity) {
          chat.lastActivity = Date.now();
          chat.preview = {
            label: `Reacted: ${emojiChar}`,
            text: chat.messages[i].text,
          };
        }

        return chat;
      })
    );
  };

  const updateLastOpen = (chatId: string) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === chatId) {
          chat.lastOpen = new Date().getTime();
        }

        return chat;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        addMessage,
        addReaction,
        addReactionToMessage,
        updateLastOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
