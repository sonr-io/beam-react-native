import emoji from "emoji-datasource";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmojiCategoryActivities from "../icons/EmojiCategoryActivities";
import EmojiCategoryAnimals from "../icons/EmojiCategoryAnimals";
import EmojiCategoryFlags from "../icons/EmojiCategoryFlags";
import EmojiCategoryFood from "../icons/EmojiCategoryFood";
import EmojiCategoryHistory from "../icons/EmojiCategoryHistory";
import EmojiCategoryObjects from "../icons/EmojiCategoryObjects";
import EmojiCategoryPlaces from "../icons/EmojiCategoryPlaces";
import EmojiCategorySmile from "../icons/EmojiCategorySmile";
import EmojiCategorySymbols from "../icons/EmojiCategorySymbols";
import { Emoji, EmojiCategory } from "../types/Emoji";

const charFromUtf16 = (utf16: string) => {
  return String.fromCodePoint(
    ...utf16.split("-").map((code) => Number(`0x${code}`))
  );
};

const charFromEmojiObject = (emoji: Emoji) => charFromUtf16(emoji.unified);

type EmojiCategoryIconProps = { category: EmojiCategory; active: boolean };
const EmojiCategoryIcon = ({ category, active }: EmojiCategoryIconProps) => {
  switch (category) {
    case "History":
      return <EmojiCategoryHistory active={active} />;

    case "Smileys & People":
      return <EmojiCategorySmile active={active} />;

    case "Animals & Nature":
      return <EmojiCategoryAnimals active={active} />;

    case "Food & Drink":
      return <EmojiCategoryFood active={active} />;

    case "Activities":
      return <EmojiCategoryActivities active={active} />;

    case "Travel & Places":
      return <EmojiCategoryPlaces active={active} />;

    case "Objects":
      return <EmojiCategoryObjects active={active} />;

    case "Symbols":
      return <EmojiCategorySymbols active={active} />;

    case "Flags":
      return <EmojiCategoryFlags active={active} />;
  }
};

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
  const emojiCategories: EmojiCategory[] = [
    "History",
    "Smileys & People",
    "Animals & Nature",
    "Food & Drink",
    "Activities",
    "Travel & Places",
    "Objects",
    "Symbols",
    "Flags",
  ];

  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("History");

  const validEmojis = emoji.filter((e) => !e["obsoleted_by"]);

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
    const emojisFromCurrentCategory = validEmojis.filter(
      (e) => e.category === selectedCategory
    );
    setEmojis(emojisFromCurrentCategory as Emoji[]);
  }, [selectedCategory]);

  return (
    <View style={styles.wrapper}>
      <>
        <View style={styles.emojiList}>
          <FlatList
            data={emojis}
            renderItem={({ item }) => (
              <EmojiItem
                key={item.unified}
                emoji={item}
                onSelectEmoji={handleSelectEmoji}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            numColumns={8}
          />
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
  categories: {
    marginTop: 15,
    marginBottom: 10,
  },
  selectedCategory: {
    borderBottomColor: "#88849C",
    borderBottomWidth: 2,
  },
  emojiList: {
    height: 300,
  },
  emojiItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
