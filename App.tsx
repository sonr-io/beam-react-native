import "intl";
import "intl/locale-data/jsonp/en";
import "react-native-gesture-handler";

import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Outfit_400Regular, Outfit_700Bold } from "@expo-google-fonts/outfit";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { fakeChats } from "./src/_data/chats";
import { Thiago } from "./src/_data/users";
import { ChatContext } from "./src/contexts/ChatContext";
import { UserContext } from "./src/contexts/UserContext";
import ChatScreen from "./src/screens/Chat";
import { Chat } from "./src/types/Chat";
import { User } from "./src/types/User";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import NearbyScreen from "./src/screens/Nearby";
// import ProfileScreen from "./src/screens/Profile";

// const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Outfit_400Regular,
    Outfit_700Bold,
    THICCCBOI_ExtraBold: require("./assets/fonts/THICCCBOI-ExtraBold.ttf"),
    THICCCBOI_Bold: require("./assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOI_Medium: require("./assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOI_Regular: require("./assets/fonts/THICCCBOI-Regular.ttf"),
  });

  const [user, setUser] = useState<User>(Thiago);
  const [chats, setChats] = useState<Chat[]>(fakeChats);

  const addMessage = (chatId: string, message: string, parentId?: string) => {
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
        });
        return chat;
      })
    );
  };

  const addReaction = (chatId: string, messageId: string, emoji: string) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        const i = chat.messages.findIndex((m) => m.id === messageId);
        chat.messages[i].reactions.unshift({ emoji, user });
        return chat;
      })
    );
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <UserContext.Provider value={{ user, setUser }}>
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
            <ChatScreen />
          </NavigationContainer>
        </ChatContext.Provider>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
