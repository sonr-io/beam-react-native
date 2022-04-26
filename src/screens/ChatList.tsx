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
import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";

import { ChatItem } from "../components/Chat/ChatItem";
import { ChatListItem } from "../components/Chat/ChatListItem";
import { GradientHeader } from "../components/GradientHeader";
import { chats } from "../_data/chats";
import { Thiago } from "../_data/users";
import { Chat } from "../types/Chat";
import BackArrow from "../icons/BackArrow";
import Send from "../icons/Send";

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

type ChatViewProps = StackScreenProps<Params, "View">;

const ChatView = ({ route, navigation }: ChatViewProps) => {
  const insets = useSafeAreaInsets();
  const chat = chats.find((chat) => chat.id === route.params.id);
  const user = Thiago;

  if (!chat) {
    return <></>;
  }

  return (
    <>
      <FlatList
        style={styles.chatContainer}
        inverted
        data={chat.messages.slice().reverse()}
        contentInset={{ top: 64, bottom: 84 }}
        renderItem={({ item: message }) => (
          <ChatItem message={message} user={user} />
        )}
        keyExtractor={(item) => item.id}
      />
      <BlurView intensity={24} style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.chatTitle}>{chat.name}</Text>
      </BlurView>
      <View style={styles.messageInputShadow}>
        <View style={styles.messageInputContainer}>
          <BlurView intensity={24} style={styles.messageInputBlur}>
            <TextInput
              style={styles.messageInput}
              placeholder="New message"
              placeholderTextColor="#353945"
            />
            <TouchableOpacity>
              <Send />
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
      <KeyboardSpacer topSpacing={-insets.bottom} />
    </>
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
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
  },
  chatHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 72,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    alignItems: "center",
  },
  chatTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  backButton: {
    paddingVertical: 30,
    paddingLeft: 24,
    paddingRight: 18,
  },
  messageInputShadow: {
    shadowOffset: { width: 2, height: 6 },
    shadowRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.24,
  },
  messageInputContainer: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("screen").width - 24,
    height: 48,
    marginHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "transparent",
    borderColor: "#1792FF",
    borderWidth: 2,
    borderRadius: 48,
    overflow: "hidden",
  },
  messageInputBlur: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: 44,
    paddingLeft: 16,
    paddingRight: 8,
  },
  messageInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    flex: 1,
  },
});

export const ChatListScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={ChatList} />
    <Stack.Screen name="View" component={ChatView} />
  </Stack.Navigator>
);
