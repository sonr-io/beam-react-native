import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ChatListItem } from "../../components/Chat/ChatListItem";
import { GradientHeader } from "../../components/GradientHeader";
import { chats } from "../../_data/chats";
import { Chat } from "../../types/Chat";

import { Params } from ".";

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const navitgateToChat = (id: string) => {
    navigation.navigate("View", { id });
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.listContainer}>
      <GradientHeader text="Messages" />
      <View style={styles.list}>
        {chats.map((chat: Chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            navitgateToChat={navitgateToChat}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  list: {
    alignItems: "stretch",
  },
});

export default ChatList;
