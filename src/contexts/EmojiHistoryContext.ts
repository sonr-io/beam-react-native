import { createContext, useContext } from "react";

import { Emoji } from "../types/Emoji";

export type EmojiHistoryContextType = {
  emojisHistory: Emoji[];
  addEmojiToHistory: (emoji: Emoji) => Promise<void>;
};
export const EmojiHistoryContext = createContext<EmojiHistoryContextType>({
  emojisHistory: [],
  addEmojiToHistory: async () => {},
});
export const useEmojiHistoryContext = () => useContext(EmojiHistoryContext);
