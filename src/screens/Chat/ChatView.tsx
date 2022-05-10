import { DateTime } from "luxon";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { OpenGraphParser } from "react-native-opengraph-kit";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";

import { chats } from "../../_data/chats";
import { Thiago, users } from "../../_data/users";

import { Avatar } from "../../components/Avatar/Avatar";
import BlurView from "../../components/BlurView";
import { ChatItem } from "../../components/Chat/ChatItem";
import { GradientTop } from "../../components/GradientTop";

import IconBackArrow from "../../icons/BackArrow";
import IconBeam from "../../icons/Beam";
import IconFontSize from "../../icons/FontSize";
import IconMore from "../../icons/More";
import IconPlus from "../../icons/Plus";
import IconSend from "../../icons/Send";

import { getFormattedDay } from "../../lib/getFormattedDay";

import { Message, PageMeta, ViewableMessage } from "../../types/Chat";

const toViewable = (messages: Message[]): ViewableMessage[] => {
  const messageItems: ViewableMessage[] = messages.map((m) => ({
    last: true,
    showDate: true,
    ...m,
  }));

  for (let i = 0; i < messageItems.length - 1; i++) {
    messageItems[i].last =
      messageItems[i].sender.id !== messageItems[i + 1].sender.id;

    const currentMessageTime = DateTime.fromMillis(messageItems[i].timestamp);
    const nextMessageTime = DateTime.fromMillis(messageItems[i + 1].timestamp);
    messageItems[i + 1].showDate = !currentMessageTime.hasSame(
      nextMessageTime,
      "day"
    );
  }

  return messageItems;
};

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "ChatView">;

const ChatView: React.FC<Props> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const me = Thiago;

  const chat = chats.find((chat) => chat.id === route.params.id);
  const recipient = users.find((user) => user.id === chat?.name);
  if (!chat || !recipient) {
    return <></>;
  }

  const [messages, setMessages] = useState(toViewable(chat.messages).reverse());
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) {
      return;
    }

    OpenGraphParser.extractMeta(message)
      .then((data: PageMeta[]) => {
        const [metas] = data;
        if (!metas) {
          return;
        }

        console.log({ metas });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [message]);

  const pushMessage = (messages: ViewableMessage[]) => {
    if (message.length <= 0) {
      return messages;
    }

    const lastMessage = messages[0];
    lastMessage.last = me.id !== lastMessage.sender.id;

    const timestamp = new Date().getTime();
    const messageTime = DateTime.fromMillis(timestamp);
    const lastMessageTime = DateTime.fromMillis(lastMessage.timestamp);
    const showDate = !messageTime.hasSame(lastMessageTime, "day");

    messages.unshift({
      last: true,
      showDate,
      id: (messages.length + 1).toString(),
      text: message,
      timestamp,
      sender: me,
      reactions: [],
    });
    setMessage("");
    return messages;
  };

  const getParentMessage = (message: Message) => {
    return messages.find((m) => m.id === message.parentId);
  };

  return (
    <>
      <GradientTop style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconBackArrow />
        </TouchableOpacity>
        <Avatar user={recipient} />
        <View>
          <Text style={styles.recipientName}>{recipient.name}</Text>
          <Text style={styles.recipientId}>{recipient.id}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginRight: 8 }}>
          <IconBeam />
        </View>
        <IconMore />
      </GradientTop>
      <FlatList
        style={styles.chatContainer}
        inverted
        data={messages}
        contentContainerStyle={{
          paddingTop: 58,
        }}
        renderItem={({ item }) => {
          return (
            <View>
              {item.showDate && (
                <View style={styles.dateSeparatorContainer}>
                  <View style={styles.line} />
                  <Text style={styles.dateSeparator}>
                    {getFormattedDay(item.timestamp)}
                  </Text>
                  <View style={styles.line} />
                </View>
              )}
              <ChatItem
                message={item}
                parentMessage={getParentMessage(item)}
                user={me}
                onSwipe={() => {
                  navigation.navigate("MessageMenu", { message: item });
                }}
              />
              {item.last && <View style={{ marginTop: 8 }} />}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <BlurView intensity={80} style={styles.messageInputBlur}>
        <View style={styles.messageToolbarButton}>
          <IconPlus fill="#5E5B71" />
        </View>
        <View style={styles.messageToolbarButton}>
          <IconFontSize />
        </View>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            multiline
            placeholder="New message"
            placeholderTextColor="#88849C"
            value={message}
            onChangeText={(message) => setMessage(message)}
          />
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity onPress={() => setMessages(pushMessage)}>
              {!!message ? <IconSend /> : <View style={{ height: 32 }} />}
            </TouchableOpacity>
          </View>
        </View>
        {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
      </BlurView>
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
    </>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  recipientName: {
    fontFamily: "THICCCBOI_Bold",
    fontSize: 20,
    lineHeight: 24,
    color: "#FFF",
  },
  recipientId: {
    fontFamily: "THICCCBOI_Medium",
    fontSize: 16,
    lineHeight: 20,
    color: "rgba(255, 255, 255, 0.5)",
  },
  backButton: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 28,
  },
  chatContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dateSeparatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dateSeparator: {
    fontFamily: "THICCCBOI_Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#B1B5B3",
    marginHorizontal: 8,
  },
  line: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: "#B1B5B3",
  },
  messageInputBlur: {
    position: "absolute",
    bottom: 0,
    backgroundColor: ios ? "rgba(136, 132, 156, 0.1)" : "#FFF",
    padding: 8,
    flexDirection: "row",
  },
  messageToolbarButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    marginRight: 8,
  },
  messageInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ios ? "rgba(255, 255, 255, 0.7)" : "#FFF",
    borderColor: "#D9D7E6",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingRight: 4,
    paddingLeft: 16,
    maxHeight: 230,
  },
  messageInput: {
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
    lineHeight: 20,
    color: "#5E5B71",
    height: "100%",
    flex: 1,
  },
});

export default ChatView;
