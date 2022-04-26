import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { getTime } from "../../lib/getTime";
import { Message } from "../../types/Chat";
import { User } from "../../types/User";

interface Props {
  message: Message;
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
            ? styles.messageOutgoing
            : styles.messageIncoming,
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
    marginBottom: 20,
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
