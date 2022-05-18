import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useEmojiHistoryContext } from "../../contexts/EmojiHistoryContext";
import IconPlus from "../../icons/Plus";
import { Emoji } from "../../types/Emoji";
import { EmojiItem } from "./EmojiItem";

type EmojiPresetBarProps = {
  onSelectEmoji: (emoji: Emoji) => void;
  handleEmojiSelectorVisibility: () => void;
  isEmojiSelectorVisible: boolean;
};

export const EmojiPresetBar = ({
  onSelectEmoji,
  handleEmojiSelectorVisibility,
  isEmojiSelectorVisible,
}: EmojiPresetBarProps) => {
  const { emojisHistory } = useEmojiHistoryContext();
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    if (!emojisHistory || !emojisHistory.length) {
      return;
    }
    setEmojis(
      emojisHistory.filter((_, i) => {
        return i <= 6;
      })
    );
  }, [emojisHistory]);

  if (!emojis || !emojis.length) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      {emojis.map((emoji) => {
        return (
          <EmojiItem
            key={emoji.unified}
            emoji={emoji}
            onSelectEmoji={onSelectEmoji}
          />
        );
      })}
      <TouchableOpacity
        onPress={handleEmojiSelectorVisibility}
        style={styles.emojiShowSelector}
      >
        <View
          style={{
            transform: [{ rotate: isEmojiSelectorVisible ? "45deg" : "0deg" }],
          }}
        >
          <IconPlus />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  emojiShowSelector: {
    flex: 1,
    paddingTop: 4,
    paddingRight: 0,
  },
});
