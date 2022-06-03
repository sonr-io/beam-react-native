import AsyncStorage from "@react-native-async-storage/async-storage";
import emoji from "emoji-datasource";
import React, { createContext, useContext, useState, useEffect } from "react";

import { Emoji } from "../types/Emoji";
import { DefaultEmojisNames, StorageKeyForEmojis } from "../Constants/Emojis";

type EmojiHistoryContextType = {
  emojisHistory: Emoji[];
  addEmojiToHistory: (emoji: Emoji) => Promise<void>;
};

const EmojiHistoryContext = createContext<EmojiHistoryContextType>({
  emojisHistory: [],
  addEmojiToHistory: async () => {},
});
export const useEmojiHistoryContext = () => useContext(EmojiHistoryContext);

export const EmojiHistoryContextProvider: React.FC = ({ children }) => {
  const [emojisHistory, setEmojisHistory] = useState<Emoji[]>([]);

  const addEmojiToHistory = async (emoji: Emoji) => {
    const history = await AsyncStorage.getItem(StorageKeyForEmojis);
    let value: Emoji[] = [];
    if (!history) {
      value.push(Object.assign({}, emoji, { count: 1 }));
    } else {
      value = JSON.parse(history) as Emoji[];
      const emojiIndex = value.findIndex((e) => e.unified === emoji.unified);
      if (emojiIndex >= 0) {
        value.splice(emojiIndex, 1);
      }
      value.unshift(emoji);
    }
    AsyncStorage.setItem(StorageKeyForEmojis, JSON.stringify(value));
    setEmojisHistory(value);
  };

  const loadEmojisHistory = async () => {
    const history = await AsyncStorage.getItem(StorageKeyForEmojis);
    if (!history) {
      const defaultEmojis = emoji
        .filter((emoji: Emoji) => DefaultEmojisNames.includes(emoji.name))
        .map((e) => ({
          name: e.name,
          unified: e.unified,
          category: e.category,
          subcategory: e.subcategory,
          sort_order: e.sort_order,
        })) as Emoji[];

      await AsyncStorage.setItem(
        StorageKeyForEmojis,
        JSON.stringify(defaultEmojis)
      );
      return setEmojisHistory(defaultEmojis);
    }

    setEmojisHistory(JSON.parse(history) as Emoji[]);
  };

  useEffect(() => {
    loadEmojisHistory();
  }, []);

  return (
    <EmojiHistoryContext.Provider value={{ emojisHistory, addEmojiToHistory }}>
      {children}
    </EmojiHistoryContext.Provider>
  );
};
