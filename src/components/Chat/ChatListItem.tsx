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
  const {
    messages,
    user: { name },
    preview,
    lastOpen,
    lastActivity,
  } = props.chat;

  const elapsedTime = timeAgo(lastActivity);

  const totalUnreadMessages = messages.reduce((count, message) => {
    if (message.timestamp > lastOpen) {
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
        <Avatar />

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text numberOfLines={1} style={styles.chatName}>
              {name}
            </Text>

            {totalUnreadMessages > 0 && (
              <View style={styles.totalUnreadMessages}>
                <Text style={styles.totalUnreadMessagesText}>
                  {totalUnreadMessages}
                </Text>
              </View>
            )}

            <Text style={styles.messageTime}>{elapsedTime}</Text>
          </View>

          <Text style={styles.lastMessage} numberOfLines={1}>
            {preview ? (
              <>
                {preview.label && (
                  <Text style={{ color: "#3A324A" }}>
                    {preview.label}&nbsp;
                  </Text>
                )}
                <Text>{preview.text}</Text>
              </>
            ) : (
              <Text style={{ color: "#D1CED7" }}>No messages</Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatName: {
    flex: 1,
    fontFamily: "THICCCBOI_Bold",
    fontSize: 20,
    lineHeight: 24,
    color: "#353945",
  },
  totalUnreadMessages: {
    borderRadius: 2,
    backgroundColor: "#14B69A",
    paddingVertical: 2,
    paddingHorizontal: 4,
    margin: 4,
  },
  totalUnreadMessagesText: {
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#FFFFFF",
    fontSize: 10,
  },
  lastMessage: {
    fontFamily: "THICCCBOI_Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#777E90",
  },
  messageTime: {
    fontSize: 12,
    paddingTop: 6,
    marginLeft: 10,
    fontFamily: "THICCCBOI_Bold",
    textAlign: "right",
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
