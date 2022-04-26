import { StackScreenProps } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatItem } from "../../components/Chat/ChatItem";
import BackArrow from "../../icons/BackArrow";
import Send from "../../icons/Send";
import { Message } from "../../types/Chat";

import { chats } from "../../_data/chats";
import { Thiago } from "../../_data/users";

import { Params } from ".";

type Item =
  | (Message & { type: "message"; last: boolean })
  | { id: string; type: "separator" };

const addSeparators = (messages: Message[]): Item[] => {
  let lastMessageSender = messages[0].sender.id;
  const output: Item[] = [];

  for (const message of messages) {
    if (lastMessageSender !== message.sender.id) {
      const lastMessage = output[output.length - 1] as any;
      lastMessage.last = true;
      output.push({ id: `${lastMessage.id}#`, type: "separator" });
    }
    output.push({ ...message, type: "message", last: false });
    lastMessageSender = message.sender.id;
  }

  (output[output.length - 1] as any).last = true;

  return output;
};

type Props = StackScreenProps<Params, "View">;

const ChatView = ({ route, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const chat = chats.find((chat) => chat.id === route.params.id);
  const user = Thiago;

  if (!chat) {
    return <></>;
  }

  const items = addSeparators(chat.messages).reverse();

  return (
    <>
      <FlatList
        style={styles.chatContainer}
        inverted
        data={items}
        contentContainerStyle={{
          paddingTop: 72,
          paddingBottom: 84,
        }}
        renderItem={({ item }) => {
          if (item.type === "separator") {
            return <View style={{ marginTop: 8 }} />;
          } else if (item.type === "message") {
            return <ChatItem message={item} user={user} />;
          }

          return <></>;
        }}
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

export default ChatView;
