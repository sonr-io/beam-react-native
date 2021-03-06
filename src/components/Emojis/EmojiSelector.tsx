import emoji from "emoji-datasource";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { useEmojiHistoryContext } from "../../contexts/EmojiHistoryContext";
import { Emoji, EmojiCategory } from "../../types/Emoji";
import { emojiCategories, EmojiCategoryIcon } from "./EmojiCategoryIcon";
import { EmojiCategoryView } from "./EmojiCategoryView";

type EmojiSelectorProps = { onSelectEmoji: (emoji: Emoji) => void };

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  onSelectEmoji,
}) => {
  const { emojisHistory } = useEmojiHistoryContext();

  const validEmojis: Emoji[] = emoji
    .filter((e) => !e["obsoleted_by"])
    .map((e) => ({
      name: e.name,
      unified: e.unified,
      category: e.category,
      subcategory: e.subcategory,
      sort_order: e.sort_order,
    }));

  const filterEmojisByCategory = (category: EmojiCategory) => {
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

  useEffect(() => {
    if (!emojisHistory || !emojisHistory.length) {
      return;
    }
  }, [emojisHistory]);

  return (
    <View style={styles.wrapper}>
      <ScrollableTabView
        initialPage={0}
        tabBarPosition="bottom"
        prerenderingSiblingsNumber={1}
        renderTabBar={({ activeTab, goToPage }) => (
          <View style={[styles.container, styles.categories]}>
            {emojiCategories.map((category, index) => {
              const active = activeTab === index;

              return (
                <View
                  key={category}
                  style={[
                    styles.emojiCategoryBarItem,
                    active ? styles.emojiCategoryBarItemSelected : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      goToPage && goToPage(index);
                    }}
                    activeOpacity={0.5}
                  >
                    <EmojiCategoryIcon category={category} active={active} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      >
        {emojiCategories.map((category, index) => {
          return (
            <EmojiCategoryView
              key={`category-${index}`}
              emojis={filterEmojisByCategory(category)}
              onSelectEmoji={onSelectEmoji}
            />
          );
        })}
      </ScrollableTabView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    padding: 5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 4,
    height: 330,
    overflow: "visible",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  categories: {
    marginTop: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  emojiCategoryBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 30,
    borderRadius: 35,
    backgroundColor: "transparent",
  },
  emojiCategoryBarItemSelected: {
    backgroundColor: "#88849C",
  },
});
