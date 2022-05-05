import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { Params } from ".";
import { Thiago as me } from "../../_data/users";
import BlurView from "../../components/BlurView";
import { MessageBubble } from "../../components/MessageBubble";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "MessageMenu">;

const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message } = route.params;

  return (
    <BlurView intensity={75} style={styles.container}>
      <MessageBubble
        text={message.text}
        timestamp={message.timestamp}
        isIncoming={me.id !== message.sender.id}
        showTimestamp={true}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ios ? "#FFF0" : "#FFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  messageInput: {
    marginTop: 20,
  },
});

export default MessageMenu;
