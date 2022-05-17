import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

import { useEmojiHistoryContext } from "../../contexts/EmojiHistoryContext";
import IconPlus from "../../icons/Plus";
import { Emoji } from "../../types/Emoji";
import { charFromEmojiObject, EmojiItem } from "./EmojiItem";

type EmojiPresetBarProps = {
  onSelectEmoji: (emoji: string) => void;
  handleShowEmojiSelector: () => void;
};

export const EmojiPresetBar = ({
  onSelectEmoji,
  handleShowEmojiSelector,
}: EmojiPresetBarProps) => {
  const { emojisHistory, addEmojiToHistory } = useEmojiHistoryContext();
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  const animationOfEmojisToggleButton = new Animated.Value(
    showEmojiSelector ? 0 : 1
  );

  Animated.timing(animationOfEmojisToggleButton, {
    toValue: showEmojiSelector ? 1 : 0,
    duration: 100,
    useNativeDriver: true,
  }).start();

  const rotateEmojisToggleButtonInterpolate =
    animationOfEmojisToggleButton.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
    });

  const animatedStylesForEmojisToggleButton = {
    transform: [{ rotate: rotateEmojisToggleButtonInterpolate }],
  };

  useEffect(() => {
    if (!emojisHistory || !emojisHistory.length) {
      return;
    }
    setEmojis(
      emojisHistory.filter((_, i) => {
        return i <= 7;
      })
    );
  }, [emojisHistory]);

  if (!emojis || !emojis.length) {
    return <></>;
  }

  const handleSelectEmoji = (emoji: Emoji) => {
    onSelectEmoji(charFromEmojiObject(emoji));
    addEmojiToHistory(emoji);
  };

  return (
    <View style={styles.wrapper}>
      {emojis.map((emoji) => {
        return (
          <EmojiItem
            key={emoji.unified}
            emoji={emoji}
            onSelectEmoji={handleSelectEmoji}
          />
        );
      })}
      <TouchableOpacity
        onPress={() => {
          setShowEmojiSelector(!showEmojiSelector);
          handleShowEmojiSelector();
        }}
        style={styles.emojiShowSelector}
      >
        <Animated.View style={animatedStylesForEmojisToggleButton}>
          <IconPlus />
        </Animated.View>
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
