import emoji from "emoji-datasource";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
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
  const storageKey = "Beam_EmojisHistory";

  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [emojisHistory, setEmojisHistory] = useState<Emoji[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("History");

  const validEmojis: Emoji[] = emoji
    .filter((e) => !e["obsoleted_by"])
    .map((e) => ({
      name: e.name,
      unified: e.unified,
      category: e.category,
      subcategory: e.subcategory,
      sort_order: e.sort_order,
    }));

  const filterEmojisByCategory = (category: EmojiCategory): Emoji[] => {
    const categoryLookup =
      category === "Smileys & People"
        ? ["Smileys & Emotion", "People & Body"]
        : [category];

    if (category === "History") {
      return emojisHistory;
    }

    return validEmojis
      .filter((e) => categoryLookup.includes(e.category))
      .sort((a, b) => a.sort_order - b.sort_order) as Emoji[];
  };

  const addEmojiToHistory = async (emoji: Emoji) => {
    const history = await AsyncStorage.getItem(storageKey);
    let value = [];
    if (!history) {
      value.push(Object.assign({}, emoji, { count: 1 }));
    } else {
      const json = JSON.parse(history);
      if (json.filter((e: Emoji) => e.unified === emoji.unified).length > 0) {
        value = json;
      } else {
        value = [Object.assign({}, emoji, { count: 1 }), ...json];
      }
    }

    AsyncStorage.setItem(storageKey, JSON.stringify(value));
    setEmojisHistory(value);
  };

  const loadEmojisHistory = async () => {
    const history = await AsyncStorage.getItem(storageKey);
    if (!history) {
      return;
    }

    setEmojisHistory(JSON.parse(history));
    setEmojis(JSON.parse(history));
  };

  const handleSelectEmoji = (emoji: Emoji) => {
    onSelectEmoji(charFromEmojiObject(emoji));
    addEmojiToHistory(emoji);
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

  useEffect(() => {
    loadEmojisHistory();
  }, []);

  const emojisGrid = (): Emoji[][] => {
    const totalEmojis = emojis.length;
    const minColumnsPerRow = 7;
    if (totalEmojis < minColumnsPerRow) {
      return new Array(emojis);
    }

    let currentRow = 0;
    const maxNumberOfRows = 7;
    const grid: Emoji[][] = [];
    const maxColumnsPerRow = Math.ceil(totalEmojis / maxNumberOfRows);
    const columnsPerRow =
      maxColumnsPerRow < minColumnsPerRow ? minColumnsPerRow : maxColumnsPerRow;

    emojis.forEach((e) => {
      if (!grid[currentRow]) {
        grid[currentRow] = [];
      }
      grid[currentRow].push(e);

      if (grid[currentRow].length + 1 > columnsPerRow) {
        currentRow++;
      }
    });

    return grid;
  };

  return (
    <View style={styles.wrapper}>
      <>
        <View style={styles.emojiContainer}>
          <ScrollView horizontal ref={scrollViewRef}>
            <View>
              {emojisGrid().map((grid: Emoji[]) => {
                return (
                  <View style={[styles.emojisScrollViewContainer]}>
                    {grid.map((emoji) => {
                      return (
                        <EmojiItem
                          key={emoji.unified}
                          emoji={emoji}
                          onSelectEmoji={handleSelectEmoji}
                        />
                      );
                    })}
                  </View>
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
    flexDirection: "row",
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
