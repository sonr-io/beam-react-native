import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { getTime } from "../../lib/getTime";
import { Message } from "../../types/Chat";
import { User } from "../../types/User";

interface Props {
  message: Message & { last: boolean };
  user: User;
}

export const ChatItem: React.FC<Props> = ({ message, user }) => {
  const [showTimestamp, setShowTimestamp] = React.useState(false);

  return (
    <TouchableWithoutFeedback
      style={styles.messageContainer}
      onPress={() => {
        setShowTimestamp(!showTimestamp);
      }}
    >
      <View
        style={[
          styles.message,
          message.sender.id === user.id
            ? [
                styles.messageOutgoing,
                message.last && styles.lastMessageOutgoing,
              ]
            : [
                styles.messageIncoming,
                message.last && styles.lastMessageIncoming,
              ],
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      {showTimestamp && (
        <Text
          style={[
            styles.messageTimestamp,
            message.sender.id === user.id
              ? styles.messageTimestampOutgoing
              : styles.messageTimestampIncoming,
          ]}
        >
          {getTime(message.timestamp)}
        </Text>
      )}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 4,
  },
  message: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  messageOutgoing: {
    alignSelf: "flex-end",
    backgroundColor: "#777E90",
    marginLeft: 40,
  },
  messageIncoming: {
    alignSelf: "flex-start",
    backgroundColor: "#1792FF",
    marginRight: 40,
  },
  lastMessageOutgoing: {
    borderBottomRightRadius: 4,
  },
  lastMessageIncoming: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FCFCFD",
  },
  messageTimestamp: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 10,
    color: "#B1B5C4",
    marginTop: 4,
  },
  messageTimestampOutgoing: {
    alignSelf: "flex-end",
  },
  messageTimestampIncoming: {
    alignSelf: "flex-start",
  },
});
