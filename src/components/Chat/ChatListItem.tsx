import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { timeAgo } from "../../lib/timeAgo";
import { Chat } from "../../types/Chat";
import { Avatar } from "../Avatar/Avatar";

type Props = {
  chat: Chat;
  onPress: (id: string) => void;
};

export const ChatListItem = (props: Props) => {
  const { id, name, lastSeen, messages } = props.chat;

  if (!messages) {
    return <></>;
  }

  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    return <></>;
  }

  const elapsedTime = timeAgo(lastMessage.timestamp);

  const totalUnReadMessages = messages.reduce((count, message) => {
    if (message.timestamp > lastSeen) {
      return count + 1;
    }

    return count;
  }, 0);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.onPress(props.chat.id);
      }}
    >
      <View style={styles.buttonContainer}>
        <Avatar user={lastMessage.sender}></Avatar>
        <View style={{ flex: 1 }}>
          <Text style={styles.messageName}>
            {name}

            {totalUnReadMessages > 0 && (
              <>
                {" "}
                <View style={styles.totalUnReadMessages}>
                  <Text style={styles.totalUnReadMessagesText}>
                    {totalUnReadMessages}
                  </Text>
                </View>
              </>
            )}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage?.text}
          </Text>
        </View>
        <Text style={styles.messageTime}>{elapsedTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    color: "#353945",
  },
  totalUnReadMessages: {
    borderRadius: 2,
    backgroundColor: "#14B69A",
    textAlign: "center",
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
  },
  totalUnReadMessagesText: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#FFFFFF",
    fontSize: 8,
  },
  lastMessage: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#777E90",
  },
  messageTime: {
    fontSize: 12,
    paddingTop: 6,
    fontFamily: "Outfit_700Bold",
    alignSelf: "flex-start",
    color: "#D9D7E6",
  },
  button: {
    padding: 12,
    paddingLeft: 0,
    marginTop: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
