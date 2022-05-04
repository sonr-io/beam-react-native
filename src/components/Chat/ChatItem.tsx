import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Swipeable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { getTime } from "../../lib/getTime";
import { ViewableMessage } from "../../types/Chat";
import { User } from "../../types/User";
import { MessageBubble } from "../MessageBubble";

interface Props {
  message: ViewableMessage;
  user: User;
  onSwipe: () => void;
}

export const ChatItem: React.FC<Props> = ({ message, user, onSwipe }) => {
  const [showTimestamp, setShowTimestamp] = React.useState(false);
  const swipeableRef = React.useRef<Swipeable>(null);

  const renderLeftActions = () => <View style={{ width: 30 }} />;

  const isSender = message.sender.id === user.id;

  return (
    <Swipeable
      enabled={!isSender}
      ref={swipeableRef}
      friction={4}
      leftThreshold={30}
      renderLeftActions={renderLeftActions}
      onSwipeableWillOpen={() => {
        onSwipe();
        swipeableRef.current?.close();
      }}
    >
      <TouchableWithoutFeedback
        style={styles.messageContainer}
        onPress={() => {
          setShowTimestamp(!showTimestamp);
        }}
      >
        <MessageBubble
          text={message.text}
          isIncoming={!isSender}
          isLast={message.last}
        />

        {showTimestamp && (
          <Text
            style={[
              styles.messageTimestamp,
              isSender
                ? styles.messageTimestampOutgoing
                : styles.messageTimestampIncoming,
            ]}
          >
            {getTime(message.timestamp)}
          </Text>
        )}
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 4,
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
