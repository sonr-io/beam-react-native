import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import IconBackArrow from "../../icons/BackArrow";
import IconSend from "../../icons/Send";
import { Message, PageMeta, ViewableMessage } from "../../types/Chat";

const toViewable = (messages: Message[]): ViewableMessage[] => {
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

    messages[0].last = me.id !== messages[0].sender.id;

    messages.unshift({
      last: true,
      id: (messages.length + 1).toString(),
      text: message,
      timestamp: new Date().getTime(),
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
      <FlatList
        style={styles.chatContainer}
        inverted
        data={messages}
        contentContainerStyle={{
          paddingTop: 58,
          paddingBottom: 84,
        }}
        renderItem={({ item }) => {
          return (
            <>
              {item.last && <View style={{ marginTop: 8 }} />}
              <ChatItem
                message={item}
                parentMessage={getParentMessage(item)}
                user={me}
                onSwipe={() => {
                  navigation.navigate("MessageMenu", { message: item });
                }}
              />
            </>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <BlurView intensity={24} style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconBackArrow />
        </TouchableOpacity>
        <Avatar user={recipient} />
        <Text style={styles.chatTitle}>
          {(snrUsernamePattern.exec(chat.name) ?? [])[1]}
          <Text style={{ color: "#B1B5C4" }}>.snr</Text>
        </Text>
      </BlurView>
      <BlurView intensity={80} style={styles.messageInputBlur}>
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
              <IconSend />
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
  messageInputBlur: {
    position: "absolute",
    bottom: 0,
    backgroundColor: ios ? "rgba(136, 132, 156, 0.1)" : "#FFF",
    padding: 8,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("screen").width - 16,
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
