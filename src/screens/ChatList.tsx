import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { ChatListItem } from "../components/Chat/ChatListItem";
import { GradientHeader } from "../components/GradientHeader";
import { chats } from "../_data/chats";
import { Thiago } from "../_data/users";
import { timeAgo } from "../lib/timeAgo";
import { Chat } from "../types/Chat";

const Stack = createStackNavigator();

type Params = {
  List: {};
  View: { id: string };
};

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
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets?.top, ...styles.listContainer }}>
          <GradientHeader text="Messages"></GradientHeader>
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
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

type ChatViewProps = StackScreenProps<Params, "View">;

const ChatView = ({ route }: ChatViewProps) => {
  const chat = chats.find((chat) => chat.id === route.params.id);
  const user = Thiago;

  if (!chat) {
    return <></>;
  }

  return (
    <FlatList
      style={styles.chatContainer}
      inverted
      data={chat.messages.slice().reverse()}
      renderItem={({ item: message }) => (
        <View
          style={[
            styles.messageContainer,
            message.sender.id === user.id
              ? styles.outgoingMessage
              : styles.incomingMessage,
          ]}
        >
          <Text style={styles.message}>{message.text}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
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
  chatContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  messageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  outgoingMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#777E90",
    marginLeft: 40,
  },
  incomingMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1792FF",
    marginRight: 40,
  },
  message: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FCFCFD",
  },
});

export const ChatListScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="List"
      component={ChatList}
      options={{ headerShown: false, title: "Messages" }}
    />
    <Stack.Screen name="View" component={ChatView} options={{ title: "" }} />
  </Stack.Navigator>
);
