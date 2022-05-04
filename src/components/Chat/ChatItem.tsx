import React, { useState } from "react";
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
  const [timestamp, setTimestamp] = useState(0);
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
          setTimestamp(timestamp ? 0 : message.timestamp);
          setShowTimestamp(!showTimestamp);
        }}
      >
        <MessageBubble
          text={message.text}
          isIncoming={!isSender}
          isLast={message.last}
          timestamp={timestamp}
        />
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
