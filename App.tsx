import "allsettled-polyfill";
import "intl";
import "intl/locale-data/jsonp/en";
import "./intl-collator";
import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import emoji from "emoji-datasource";
import { useFonts } from "expo-font";
import { MatrixClient } from "matrix-js-sdk";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { fakeChats } from "./src/_data/chats";
import { Thiago } from "./src/_data/users";

import { charFromEmojiObject } from "./src/components/Emojis/EmojiItem";

import { DefaultEmojisNames, StorageKeyForEmojis } from "./src/Constants";

import { ChatContext } from "./src/contexts/ChatContext";
import { EmojiHistoryContext } from "./src/contexts/EmojiHistoryContext";
import { MatrixClientContext } from "./src/contexts/MatrixClientContext";
import { UserContext } from "./src/contexts/UserContext";

import ChatScreen from "./src/screens/Chat";
import LoginScreen from "./src/screens/Login";

import { Chat } from "./src/types/Chat";
import { Emoji } from "./src/types/Emoji";
import { User } from "./src/types/User";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import NearbyScreen from "./src/screens/Nearby";
// import ProfileScreen from "./src/screens/Profile";

// const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export type StackParams = {
  Login: {};
  Chat: {};
};

export default function App() {
  const [fontsLoaded] = useFonts({
    THICCCBOI_ExtraBold: require("./assets/fonts/THICCCBOI-ExtraBold.ttf"),
    THICCCBOI_Bold: require("./assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOI_Medium: require("./assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOI_Regular: require("./assets/fonts/THICCCBOI-Regular.ttf"),
  });

  const [emojisHistory, setEmojisHistory] = useState<Emoji[]>([]);
  const [user, setUser] = useState<User>(Thiago);
  const [client, setClient] = useState<MatrixClient | null>(null);
  const [chats, setChats] = useState<Chat[]>(fakeChats);

  const addMessage = ({
    chatId,
    message,
    parentId,
    forwardedFrom,
  }: {
    chatId: string;
    message: string;
    parentId?: string;
    forwardedFrom?: string;
  }) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        chat.messages.push({
          id: (chat.messages.length + 1).toString(),
          text: message,
          timestamp: new Date().getTime(),
          sender: user,
          reactions: [],
          parentId,
          forwardedFrom,
        });
        return chat;
      })
    );
  };

  const addReaction = (chatId: string, messageId: string, emoji: Emoji) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }
        updateEmojisHistory(emoji);
        const emojiChar = charFromEmojiObject(emoji);
        const i = chat.messages.findIndex((m) => m.id === messageId);
        const reactionIndex = chat.messages[i].reactions.findIndex(
          (e) => e.user.id === user.id && e.emoji === emojiChar
        );
        if (reactionIndex >= 0) {
          chat.messages[i].reactions.splice(reactionIndex, 1);
        } else {
          chat.messages[i].reactions.unshift({ emoji: emojiChar, user });
        }
        return chat;
      })
    );
  };

  const updateEmojisHistory = async (emoji: Emoji) => {
    const history = await AsyncStorage.getItem(StorageKeyForEmojis);
    let value: Emoji[] = [];
    if (!history) {
      value.push(Object.assign({}, emoji, { count: 1 }));
    } else {
      value = JSON.parse(history) as Emoji[];
      const emojiIndex = value.findIndex((e) => e.unified === emoji.unified);
      if (emojiIndex >= 0) {
        value.splice(emojiIndex, 1);
      }
      value.unshift(emoji);
    }
    AsyncStorage.setItem(StorageKeyForEmojis, JSON.stringify(value));
    setEmojisHistory(value);
  };

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
        })) as Emoji[];

      await AsyncStorage.setItem(
        StorageKeyForEmojis,
        JSON.stringify(defaultEmojis)
      );
      return setEmojisHistory(defaultEmojis);
    }

    setEmojisHistory(JSON.parse(history) as Emoji[]);
  };

  useEffect(() => {
    loadEmojisHistory();
  }, []);

  useEffect(() => {
    console.log(
      "[Rooms]",
      client?.getRooms().map((room) => room.name)
    );
  }, [client]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <UserContext.Provider value={{ user, setUser }}>
        <MatrixClientContext.Provider value={{ client, setClient }}>
          <EmojiHistoryContext.Provider
            value={{ emojisHistory, addEmojiToHistory: updateEmojisHistory }}
          >
            <ChatContext.Provider
              value={{ chats, setChats, addMessage, addReaction }}
            >
              <NavigationContainer>
                <StatusBar
                  barStyle="light-content"
                  backgroundColor={"transparent"}
                  translucent
                />
                {/*
                <Tab.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="Chat"
                >
                  <Tab.Screen name="Nearby" component={NearbyScreen} />
                  <Tab.Screen name="Chat" component={ChatListScreen} />
                  <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
                */}
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </ChatContext.Provider>
          </EmojiHistoryContext.Provider>
        </MatrixClientContext.Provider>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
