import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import BlurView from "../../components/BlurView";
import { EmojiReactions } from "../../components/EmojiReactions";
import { MessageBubble } from "../../components/MessageBubble";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "MessageMenu">;

const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message, chatId } = route.params;
  const insets = useSafeAreaInsets();
  const { user: me } = useUserContext();
  const { addReaction } = useChatContext();
  const pushEmoji = (emoji: string) => {
    addReaction(chatId, message.id, emoji);
  };

  return (
    <BlurView
      intensity={75}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.touchableBackgroundContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.goBack()}
          style={styles.touchableBackground}
        />
      </View>
      <View style={styles.content}>
        <MessageBubble
          text={message.text}
          timestamp={message.timestamp}
          isIncoming={me.id !== message.sender.id}
          showTimestamp={true}
          reactions={message.reactions.map((r) => r.emoji)}
        />
      </View>
      <EmojiReactions onSelectEmoji={(emoji) => pushEmoji(emoji)} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ios ? "#FFF0" : "#FFF",
    flex: 1,
    alignItems: "center",
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  messageInput: {
    marginTop: 20,
  },
  touchableBackgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  touchableBackground: {
    width: "100%",
    height: "100%",
  },
});

export default MessageMenu;
