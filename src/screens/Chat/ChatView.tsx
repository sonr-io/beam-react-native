import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import { Avatar } from "../../components/Avatar/Avatar";
import { ChatItem } from "../../components/Chat/ChatItem";
import { GradientTop } from "../../components/GradientTop";
import { MessageInput } from "../../components/MessageInput";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";
import IconArrowDown from "../../icons/ArrowDown";
import IconBackArrow from "../../icons/BackArrow";

import { getFormattedDay } from "../../lib/getFormattedDay";
import { markLastMessageAsRead } from "../../lib/matrix";
import { useScrollback } from "../../lib/matrixHooks";
import { client } from "../../matrixClient";
import { Chat, Message, User, ViewableMessage } from "../../types/Chat";

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
  const { id: chatId } = route.params;
  const { user } = useUserContext();
  const { chats, updateLastSeen } = useChatContext();
  const { scrollback } = useScrollback(chatId);

  const [chatRoom, setChatRoom] = useState<Chat>();
  const [recipient, setRecipient] = useState<User>();
  const [messages, setMessages] = useState<ViewableMessage[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const insets = useSafeAreaInsets();
  const FLATLIST_BOTTOM_OFFSET = 58 + insets.bottom;

  useEffect(() => {
    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) {
      return;
    }

    setChatRoom(chat);
    setRecipient(chat.user);
    setMessages(toViewable(chat.messages).reverse());

    markLastMessageAsRead(chatId);
  }, [chats]);

  useEffect(() => {
    updateLastSeen(chatId);
  }, [messages.length]);

  const pushMessage = (message: string) => {
    client.sendMessage(chatId, {
      msgtype: "m.text",
      body: message,
    });
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToIndex({
        index: 0,
        viewOffset: FLATLIST_BOTTOM_OFFSET,
      });
    }
  };

  const onEndReached = async () => {
    try {
      setLoading(true);
      await scrollback();
    } finally {
      setLoading(false);
    }
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
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.recipientName}>
            {recipient.name}
          </Text>
          <Text numberOfLines={1} style={styles.recipientId}>
            {recipient.id}
          </Text>
        </View>
        {/* <View style={{ flex: 1 }} />
        <View style={{ marginRight: 8 }}>
          <IconBeam />
        </View>
        <IconMore /> */}
      </GradientTop>
      <FlatList
        ref={flatListRef}
        style={styles.chatContainer}
        inverted
        data={messages}
        contentContainerStyle={{
          paddingTop: FLATLIST_BOTTOM_OFFSET,
          flexGrow: 1,
        }}
        // workaround to position the scrollbar correctly
        scrollIndicatorInsets={{ right: 1 }}
        onScroll={(event) => {
          const { y: yOffset } = event.nativeEvent.contentOffset;
          setShowScrollDown(yOffset > 100);
        }}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        renderItem={({ item }: { item: ViewableMessage }) => (
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
              parentSender={item.parentSender}
              parentText={item.parentText}
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
        )}
        ListEmptyComponent={() => <ListEmpty />}
        ListFooterComponent={() =>
          loading ? (
            <View style={{ marginTop: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
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
      <MessageInput onSubmit={(msg) => pushMessage(msg)} />
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
    </>
  );
};

const ListEmpty = () => (
  <View style={styles.emptyListContainer}>
    <View style={styles.emptyListContent}>
      <Text style={styles.emptyListTitle}>No Messages Yet</Text>
      <Text style={styles.emptyListSubtitle}>
        Send a message to start the conversation
      </Text>
    </View>
  </View>
);

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
  emptyListContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  emptyListContent: {
    width: 180,
    marginBottom: 50,
    transform: [{ scaleY: -1 }],
  },
  emptyListTitle: {
    fontSize: 20,
    fontFamily: "THICCCBOI_ExtraBold",
    marginVertical: 16,
    textAlign: "center",
    color: "#3A324A",
  },
  emptyListSubtitle: {
    fontSize: 16,
    fontFamily: "THICCCBOI_Regular",
    textAlign: "center",
    color: "#5F596D",
  },
});

export default ChatView;
