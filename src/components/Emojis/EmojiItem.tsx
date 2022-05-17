import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Emoji } from "../../types/Emoji";

const charFromUtf16 = (utf16: string) => {
  return String.fromCodePoint(
    ...utf16.split("-").map((code) => Number(`0x${code}`))
  );
};

export const charFromEmojiObject = (emoji: Emoji) =>
  charFromUtf16(emoji.unified);

type EmojiItemProps = { emoji: Emoji; onSelectEmoji: (emoji: Emoji) => void };
export const EmojiItem = ({ emoji, onSelectEmoji }: EmojiItemProps) => (
  <TouchableOpacity
    onPress={() => {
      onSelectEmoji(emoji);
    }}
    activeOpacity={0.5}
    style={styles.emojiItem}
  >
    <Text style={styles.emojiItemText}>{charFromEmojiObject(emoji)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  emojiItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: 26,
    width: 26,
  },
  emojiItemText: {
    fontSize: 23,
  },
});
