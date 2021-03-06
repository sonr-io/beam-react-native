import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { charFromEmojiObject } from "../../lib/emoji";
import { Emoji } from "../../types/Emoji";

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
    height: 25,
    width: 25,
  },
  emojiItemText: {
    fontSize: 18,
  },
});
