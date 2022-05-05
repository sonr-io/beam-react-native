import React from "react";
import { Button, Platform, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";

import { Params } from ".";
import BlurView from "../../components/BlurView";
import { MessageBubble } from "../../components/MessageBubble";

import { Thiago as me } from "../../_data/users";

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
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TextInput style={styles.messageInput} autoFocus />
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
