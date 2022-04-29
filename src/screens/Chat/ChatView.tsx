import { StackScreenProps } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatItem } from "../../components/Chat/ChatItem";
import BackArrow from "../../icons/BackArrow";
import Send from "../../icons/Send";
import { Message } from "../../types/Chat";

import { chats } from "../../_data/chats";
import { Thiago, users } from "../../_data/users";

import { Params } from ".";
import { Avatar } from "../../components/Avatar/Avatar";

type MessageItem = Message & { last: boolean };

const addSeparators = (messages: Message[]): MessageItem[] => {
  const messageItems = messages.map((m) => ({ last: true, ...m }));

  for (let i = 0; i < messageItems.length - 1; i++) {
    if (messageItems[i].sender.id === messageItems[i + 1].sender.id) {
      messageItems[i].last = false;
    }
  }

  return messageItems;
};

const snrUsernamePattern = /(.*)\.snr/;

const ios = Platform.OS === "ios";
const Blur = ios ? BlurView : View;

type Props = StackScreenProps<Params, "View">;

const ChatView = ({ route, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const chat = chats.find((chat) => chat.id === route.params.id);
  const recipient = users.find((user) => user.id === chat?.name);
  const me = Thiago;

  if (!chat || !recipient) {
    return <></>;
  }

  const [items, setItems] = useState(addSeparators(chat.messages).reverse());
  const [message, setMessage] = useState("");

  const pushMessage = (messages: MessageItem[]) => {
    if (message.length <= 0) {
      return messages;
    }

    messages[0].last = me.id !== messages[0].sender.id;

    messages.unshift({
      last: true,
      id: (messages.length + 1).toString(),
      text: message,
      timestamp: new Date().getTime(),
      sender: me,
    });
    setMessage("");
    return messages;
  };

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
          return (
            <>
              {item.last && <View style={{ marginTop: 8 }} />}
              <ChatItem
                message={item}
                user={me}
                onSwipe={() => {
                  navigation.navigate("MessageMenu", {});
                }}
              />
            </>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Blur intensity={24} style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <Avatar user={recipient} />
        <Text style={styles.chatTitle}>
          {(snrUsernamePattern.exec(chat.name) ?? [])[1]}
          <Text style={{ color: "#B1B5C4" }}>.snr</Text>
        </Text>
      </Blur>
      <View style={styles.messageInputShadow}>
        <View style={styles.messageInputContainer}>
          <Blur intensity={24} style={styles.messageInputBlur}>
            <TextInput
              style={styles.messageInput}
              placeholder="New message"
              placeholderTextColor="#353945"
              value={message}
              onChangeText={(message) => setMessage(message)}
            />
            <TouchableOpacity onPress={() => setItems(pushMessage)}>
              <Send />
            </TouchableOpacity>
          </Blur>
        </View>
        {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
      </View>
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
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
    backgroundColor: ios ? "rgba(255, 255, 255, 0.3)" : "#FFF",
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
    position: "absolute",
    bottom: 0,
    shadowOffset: { width: 2, height: 6 },
    shadowRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.24,
  },
  messageInputContainer: {
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
    backgroundColor: ios ? "rgba(255, 255, 255, 0.6)" : "#FFF",
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
