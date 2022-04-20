import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { chats } from "../_data/chats";
import { timeAgo } from "../lib/timeAgo";
import { Chat } from "../types/Chat";

const Stack = createStackNavigator();

type Params = {
  List: {};
  View: { id: string };
};

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Messages</Text>
      <View style={styles.list}>
        {chats.map((chat: Chat) => {
          const { id, name, lastSeen, messages } = chat;

          const lastMessage = messages.at(-1);

          if (!lastMessage) {
            return <></>;
          }

          const elapsedTime = timeAgo(lastMessage.timestamp);

          const hasUnreadMessage = lastSeen < lastMessage.timestamp;

          return (
            <TouchableOpacity
              key={id}
              style={styles.button}
              onPress={() => navigation.navigate("View", { id })}
            >
              <View style={styles.buttonContainer}>
                {hasUnreadMessage && <View style={styles.unRead}></View>}
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.messageName}>{name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage?.text}
                  </Text>
                </View>
                <Text style={styles.messageTime}>{elapsedTime}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

type ChatViewProps = StackScreenProps<Params, "View">;

const ChatView = ({ route }: ChatViewProps) => (
  <View style={styles.container}>
    <Text>{route.params.id}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    lineHeight: 32,
  },
  list: {
    alignItems: "stretch",
  },
  unRead: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#1792FF",
    position: "absolute",
    zIndex: 100,
    left: 3,
    top: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#C4C4C4",
  },
  messageName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    color: "#353945",
  },
  lastMessage: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#777E90",
  },
  messageTime: {
    fontSize: 8,
    lineHeight: 12,
    fontFamily: "Montserrat_600SemiBold",
    alignSelf: "flex-start",
    color: "#777E90",
  },
  button: {
    padding: 12,
    paddingLeft: 0,
    marginBottom: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
