import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Swipeable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

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
          timestamp={message.timestamp}
          isIncoming={!isSender}
          isLast={message.last}
          showTimestamp={showTimestamp}
        />
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 4,
  },
});
