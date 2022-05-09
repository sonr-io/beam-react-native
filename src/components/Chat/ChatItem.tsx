import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Swipeable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { Message } from "../../types/Chat";
import { User } from "../../types/User";
import { MessageBubble } from "../MessageBubble";
import { ReplyBubble } from "../ReplyBubble";

interface Props {
  message: Message;
  parentMessage?: Message;
  user: User;
  onSwipe: () => void;
}

export const ChatItem: React.FC<Props> = ({
  message,
  parentMessage,
  user,
  onSwipe,
}) => {
  const [showTimestamp, setShowTimestamp] = React.useState(false);
  const swipeableRef = React.useRef<Swipeable>(null);

  const renderLeftActions = () => <View style={{ width: 30 }} />;

  const isSender = message.sender.id === user.id;
  const selfReply = parentMessage?.sender.id === user.id;

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
      {!!parentMessage && (
        <View style={styles.parentMessageContainer}>
          <ReplyBubble
            text={parentMessage.text}
            senderName={parentMessage.sender.name}
            selfReply={selfReply}
            isIncoming={!isSender}
          />
        </View>
      )}
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
          showTimestamp={showTimestamp}
          reactions={message.reactions.map((r) => r.emoji)}
        />
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 4,
  },
  parentMessageContainer: {
    marginBottom: -10,
    marginHorizontal: 10,
  },
});
