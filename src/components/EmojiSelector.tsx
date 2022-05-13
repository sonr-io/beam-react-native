import emoji from "emoji-datasource";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Emoji, EmojiCategory } from "../types/Emoji";
import { emojiCategories, EmojiCategoryIcon } from "./EmojiCategoryIcon";

const charFromUtf16 = (utf16: string) => {
  return String.fromCodePoint(
    ...utf16.split("-").map((code) => Number(`0x${code}`))
  );
};

const charFromEmojiObject = (emoji: Emoji) => charFromUtf16(emoji.unified);

type EmojiItemProps = { emoji: Emoji; onSelectEmoji: (emoji: Emoji) => void };
const EmojiItem = ({ emoji, onSelectEmoji }: EmojiItemProps) => (
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

type EmojiSelectorProps = { onSelectEmoji: (emoji: string) => void };

export const EmojiSelector = ({ onSelectEmoji }: EmojiSelectorProps) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("History");

  const validEmojis = emoji.filter((e) => !e["obsoleted_by"]);

  const filterEmojisByCategory = (category: EmojiCategory): Emoji[] => {
    const categoryLookup =
      category === "Smileys & People"
        ? ["Smileys & Emotion", "People & Body"]
        : [category];

    return validEmojis.filter((e) =>
      categoryLookup.includes(e.category)
    ) as Emoji[];
  };

  const defaultReactions = [
    "GRINNING FACE",
    "GRINNING FACE WITH STAR EYES",
    "WHITE UP POINTING INDEX",
    "ANGRY FACE",
    "FROWNING FACE WITH OPEN MOUTH",
    "EXTRATERRESTRIAL ALIEN",
  ];

  const handleSelectEmoji = (emoji: Emoji) => {
    onSelectEmoji(charFromEmojiObject(emoji));
  };

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    const filteredEmojis = filterEmojisByCategory(selectedCategory);
    setEmojis(filteredEmojis);

    if (!scrollViewRef) {
      return;
    }
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  }, [selectedCategory]);

  return (
    <View style={styles.wrapper}>
      <>
        <View style={styles.emojiContainer}>
          <ScrollView horizontal pagingEnabled ref={scrollViewRef}>
            <View style={styles.emojisScrollViewContainer}>
              {emojis.map((emoji) => {
                return (
                  <EmojiItem
                    key={emoji.unified}
                    emoji={emoji}
                    onSelectEmoji={handleSelectEmoji}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.container, styles.categories]}>
          {emojiCategories.map((category) => {
            const active = selectedCategory === category;

            return (
              <View
                key={category}
                style={[
                  styles.emojiCategoryItem,
                  active ? styles.emojiCategoryItemSelected : null,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCategory(category);
                  }}
                  activeOpacity={0.5}
                >
                  <EmojiCategoryIcon category={category} active={active} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    padding: 5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 4,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  emojisScrollViewContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  categories: {
    marginTop: 5,
    marginBottom: 10,
  },
  selectedCategory: {
    borderBottomColor: "#88849C",
    borderBottomWidth: 2,
  },
  emojiContainer: {
    height: 280,
    paddingLeft: 5,
    paddingRight: 5,
  },
  emojiItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  emojiItemText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  emojiCategoryItemText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  emojiCategoryItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 30,
    borderRadius: 35,
    backgroundColor: "transparent",
  },
  emojiCategoryItemSelected: {
    backgroundColor: "#88849C",
  },
});
