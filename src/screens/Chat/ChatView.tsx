import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import { Avatar } from "../../components/Avatar/Avatar";
import BlurView from "../../components/BlurView";
import { ChatItem } from "../../components/Chat/ChatItem";
import { GradientTop } from "../../components/GradientTop";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";

import IconArrowDown from "../../icons/ArrowDown";
import IconBackArrow from "../../icons/BackArrow";
import IconBeam from "../../icons/Beam";
import IconFontSize from "../../icons/FontSize";
import IconMore from "../../icons/More";
import IconPlus from "../../icons/Plus";
import IconSend from "../../icons/Send";
import { getFormattedDay } from "../../lib/getFormattedDay";
import { Chat, Message, ViewableMessage } from "../../types/Chat";
import { User } from "../../types/User";

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
  const { user } = useUserContext();
  const { chats, addMessage } = useChatContext();

  const [chatRoom, setChatRoom] = useState<Chat>();
  const [recipient, setRecipient] = useState<User>();

  const insets = useSafeAreaInsets();
  const FLATLIST_BOTTOM_OFFSET = 58 + insets.bottom;
  const chatId = route.params.id;

  const [messages, setMessages] = useState<ViewableMessage[]>([]);
  const [message, setMessage] = useState("");
  const [showScrollDown, setShowScrollDown] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!chatId || !chats || !chats.length) {
      return;
    }
    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) {
      return;
    }

    setChatRoom(chat);
    setRecipient(chat.user);
    setMessages(toViewable(chat.messages).reverse());
  }, [chats, chatId]);

  const addNewMessage = () => {
    addMessage(chatId, message);
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      viewOffset: FLATLIST_BOTTOM_OFFSET,
    });
  };

  const getParentMessage = (message: Message) => {
    return messages.find((m) => m.id === message.parentId);
  };

  if (!chatRoom || !recipient) {
    return <></>;
  }

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
        ref={flatListRef}
        style={styles.chatContainer}
        inverted
        data={messages}
        contentContainerStyle={{
          paddingTop: FLATLIST_BOTTOM_OFFSET,
        }}
        onScroll={(event) => {
          const { y: yOffset } = event.nativeEvent.contentOffset;
          setShowScrollDown(yOffset > 100);
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
                user={user}
                onSwipe={() => {
                  navigation.navigate("MessageMenu", {
                    chatId,
                    message: item,
                  });
                }}
              />
              {item.last && <View style={{ marginTop: 8 }} />}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      {showScrollDown && (
        <View
          style={[
            styles.scrollDownButtonContainer,
            { marginBottom: FLATLIST_BOTTOM_OFFSET },
          ]}
        >
          <TouchableOpacity
            style={styles.scrollDownButton}
            onPress={scrollToBottom}
          >
            <IconArrowDown />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.messageInputOuterContainer}>
        <BlurView
          intensity={80}
          style={[
            styles.messageInputBlur,
            { paddingBottom: insets.bottom + 8 },
          ]}
        >
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
              <TouchableOpacity onPress={() => addNewMessage()}>
                {!!message ? <IconSend /> : <View style={{ height: 32 }} />}
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
        {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
      </View>
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
    </>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 16,
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
    paddingVertical: 8,
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
  scrollDownButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
    zIndex: 100,
  },
  scrollDownButton: {
    backgroundColor: "#046DE8",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  messageInputOuterContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  messageInputBlur: {
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
