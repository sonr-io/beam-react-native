import React from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { Message } from "../../types/Chat";
import { User } from "../../types/User";
import { MessageBubble } from "../MessageBubble";
import { ReplyBubble } from "../ReplyBubble";

interface Props {
  message: Message;
  parentSender?: User;
  parentText?: string;
  user: User;
  onSwipe: () => void;
}

export const ChatItem: React.FC<Props> = ({
  message,
  parentSender,
  parentText,
  user,
  onSwipe,
}) => {
  const [showTimestamp /* setShowTimestamp */] = React.useState(false);
  const swipeableRef = React.useRef<Swipeable>(null);

  const renderLeftActions = () => <View style={{ width: 30 }} />;

  const isSender = message.sender.id === user.id;
  const selfReply = parentSender?.id === user.id;

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
      {!!parentSender && !!parentText && (
        <View style={styles.parentMessageContainer}>
          <ReplyBubble
            text={parentText}
            senderName={parentSender.name}
            selfReply={selfReply}
            isIncoming={!isSender}
          />
        </View>
      )}
      <View
        style={styles.messageContainer}
        /* onPress={() => {
          setShowTimestamp(!showTimestamp);
        }} */
      >
        <MessageBubble
          text={message.text}
          timestamp={message.timestamp}
          isIncoming={!isSender}
          isLoading={!message.confirmed}
          showTimestamp={showTimestamp}
          reactions={message.reactions.map((r) => r.emoji)}
          forwardedFrom={message.forwardedFrom}
        />
      </View>
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
