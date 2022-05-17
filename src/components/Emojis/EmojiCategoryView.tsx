import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { Emoji } from "../../types/Emoji";
import { EmojiItem } from "./EmojiItem";

// TODO:
// handle the warning: Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release., ReactNativeFiberHostComponent
LogBox.ignoreLogs(["Calling `getNode()`"]);

type ScrollableTabViewProps = { activeTab: number };

type EmojiCategoryViewProps = {
  emojis: Emoji[];
  onSelectEmoji: (emoji: Emoji) => void;
};

export const EmojiCategoryView = ({
  emojis,
  onSelectEmoji,
}: EmojiCategoryViewProps) => {
  const [pages, setPages] = useState<Emoji[][]>([]);
  const [subPage, _] = useState(0);

  useEffect(() => {
    if (!emojis || !emojis.length) {
      return;
    }

    const emojisPerColumn = 8;
    const emojisPerRow = 6;
    const perPage = emojisPerRow * emojisPerColumn;

    let currentPage = 0;
    const pages: Emoji[][] = [];

    emojis.forEach((e) => {
      if (!pages[currentPage]) {
        pages[currentPage] = [];
      }
      pages[currentPage].push(e);

      if (pages[currentPage].length >= perPage) {
        currentPage++;
      }
    });

    setPages(pages);
  }, [emojis]);

  if (!pages || !pages.length) {
    return <></>;
  }

  return (
    <View style={styles.wapper}>
      <ScrollableTabView
        initialPage={subPage}
        renderTabBar={({ activeTab }: ScrollableTabViewProps) => {
          return (
            <View style={styles.categoryPageNavigationWrapper}>
              {pages.map((_, index) => {
                const active = activeTab === index;
                return (
                  <View
                    key={index}
                    style={[
                      styles.categoryPageNavigationPage,
                      active ? styles.categoryPageNavigationPageActive : null,
                    ]}
                  ></View>
                );
              })}
            </View>
          );
        }}
        tabBarPosition="bottom"
      >
        {pages.map((page, index) => {
          return (
            <View style={styles.categoryPageView} key={`page-${index}`}>
              {page.map((emoji) => {
                return (
                  <EmojiItem
                    key={emoji.unified}
                    emoji={emoji}
                    onSelectEmoji={onSelectEmoji}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollableTabView>
    </View>
  );
};

const styles = StyleSheet.create({
  wapper: {
    position: "relative",
    flex: 1,
    height: 300,
  },
  categoryPageView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryPageNavigationWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  categoryPageNavigationPage: {
    borderWidth: 3,
    borderColor: "white",
    flex: 1,
  },
  categoryPageNavigationPageActive: {
    borderRadius: 5,
    borderColor: "#B7B4C7",
  },
});
