import emoji from "emoji-datasource";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Plus from "../../icons/Plus";
import { Emoji, EmojiCategory } from "../../types/Emoji";

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

type EmojiReactionsProps = { onSelectEmoji: (emoji: string) => void };

export const EmojiReactions = ({ onSelectEmoji }: EmojiReactionsProps) => {
  const emojiCategorySmile: EmojiCategory = {
    symbol: "😀",
    name: "Smileys & Emotion",
  };

  const [showEmojis, setShowEmojis] = useState(false);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>(emojiCategorySmile);

  const validEmojis = emoji.filter((e) => !e["obsoleted_by"]);
  const categories: EmojiCategory[] = [
    emojiCategorySmile,
    {
      symbol: "🧑",
      name: "People & Body",
    },
    {
      symbol: "🦄",
      name: "Animals & Nature",
    },
    {
      symbol: "🍔",
      name: "Food & Drink",
    },
    {
      symbol: "⚾️",
      name: "Activities",
    },
    {
      symbol: "✈️",
      name: "Travel & Places",
    },
    {
      symbol: "💡",
      name: "Objects",
    },
    {
      symbol: "🔣",
      name: "Symbols",
    },
    {
      symbol: "🏳️‍🌈",
      name: "Flags",
    },
  ];

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
      (e) => e.category === selectedCategory.name
    );
    setEmojis(emojisFromCurrentCategory as Emoji[]);
  }, [selectedCategory]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {defaultReactions.map((name) => {
          return emoji
            .filter((e) => e.name === name)
            .map((e) => {
              return (
                <EmojiItem
                  key={e.unified}
                  emoji={e as Emoji}
                  onSelectEmoji={handleSelectEmoji}
                />
              );
            });
        })}

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.emojiItem}
          onPress={() => {
            setShowEmojis(!showEmojis);
          }}
        >
          <Plus />
        </TouchableOpacity>
      </View>
      {showEmojis && (
        <>
          <View style={[styles.container, styles.categories]}>
            {categories.map((category) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCategory(category);
                  }}
                  key={category.name}
                  activeOpacity={0.5}
                  style={[
                    styles.emojiItem,
                    ,
                    category.name === selectedCategory.name
                      ? styles.selectedCategory
                      : null,
                  ]}
                >
                  <Text style={styles.emojiCategoryItemText}>
                    {category.symbol}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    alignSelf: "center",
    padding: 5,
    backgroundColor: "#ffffff99",
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
});
