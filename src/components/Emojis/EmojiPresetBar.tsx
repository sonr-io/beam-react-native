import AsyncStorage from "@react-native-async-storage/async-storage";
import emoji from "emoji-datasource";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

import { DefaultEmojisNames, StorageKeyForEmojis } from "../../Constants";
import IconPlus from "../../icons/Plus";
import { Emoji } from "../../types/Emoji";
import { charFromEmojiObject, EmojiItem } from "./EmojiItem";
import { addEmojiToHistory } from "./EmojiSelector";

type EmojiPresetBarProps = {
  onSelectEmoji: (emoji: string) => void;
  handleShowEmojiSelector: () => void;
};

export const EmojiPresetBar = ({
  onSelectEmoji,
  handleShowEmojiSelector,
}: EmojiPresetBarProps) => {
  const [emojisHistory, setEmojisHistory] = useState<Emoji[]>([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

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
        }));
      setEmojisHistory(defaultEmojis);
      return;
    }

    setEmojisHistory(JSON.parse(history).slice(0, 7));
  };

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
    loadEmojisHistory();
  }, []);

  if (!emojisHistory || !emojisHistory.length) {
    return <></>;
  }

  const handleSelectEmoji = (emoji: Emoji) => {
    onSelectEmoji(charFromEmojiObject(emoji));
    addEmojiToHistory(emoji, () => {
      loadEmojisHistory();
    });
  };

  return (
    <View style={styles.wrapper}>
      {emojisHistory.map((emoji) => {
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
