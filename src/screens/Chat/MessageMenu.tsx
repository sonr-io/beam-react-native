import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import BlurView from "../../components/BlurView";
import { EmojiPresetBar } from "../../components/Emojis/EmojiPresetBar";
import { EmojiSelector } from "../../components/Emojis/EmojiSelector";
import { MessageBubble } from "../../components/MessageBubble";
import { MessageInput } from "../../components/MessageInput";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";
import IconCopy from "../../icons/Copy";
import IconForward from "../../icons/Forward";
import IconReply from "../../icons/Reply";
import { Emoji } from "../../types/Emoji";

const ios = Platform.OS === "ios";

type ReactionProps = {
  emoji: string;
  onPress: (emoji: string) => void;
};

const EmojiReaction = ({ emoji, onPress }: ReactionProps) => {
  return (
    <TouchableOpacity style={styles.emojiButton} onPress={() => onPress(emoji)}>
      <Text style={styles.emojiDisplay}>{emoji}</Text>
    </TouchableOpacity>
  );
};

type Props = StackScreenProps<Params, "MessageMenu">;

const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message, chatId } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useUserContext();
  const { addReaction, addMessage } = useChatContext();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  const pushEmoji = (emoji: Emoji) => {
    addReaction(chatId, message.id, emoji);
  };

  const pushMessage = (text: string) => {
    addMessage({
      chatId,
      message: text,
      parentId: message.id,
    });
    navigation.goBack();
  };

  const handleEmojiSelectorVisibility = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const inputRef = useRef<TextInput>(null);

  const onForward = () => {
    navigation.goBack();
    navigation.navigate("ForwardMenu", {});
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
          isIncoming={user.id !== message.sender.id}
          showTimestamp={true}
          reactions={message.reactions.map((r) => r.emoji)}
        />
      </View>

      <View style={styles.menuContainer}>
        <BlurView>
          <View>
            <EmojiPresetBar
              onSelectEmoji={pushEmoji}
              isEmojiSelectorVisible={showEmojiSelector}
              handleEmojiSelectorVisibility={handleEmojiSelectorVisibility}
            />
          </View>

          {showEmojiSelector && <EmojiSelector onSelectEmoji={pushEmoji} />}

          {!showEmojiSelector && (
            <>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => inputRef.current?.focus()}
              >
                <Text style={styles.menuButtonText}>Reply</Text>
                <IconReply />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={onForward}>
                <Text style={styles.menuButtonText}>Forward</Text>
                <IconForward />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Copy</Text>
                <IconCopy />
              </TouchableOpacity>
            </>
          )}
        </BlurView>
      </View>

      <MessageInput onSubmit={(msg) => pushMessage(msg)} inputRef={inputRef} />
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
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
  menuContainer: {
    width: 300,
    marginTop: 40,
    overflow: "hidden",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
  },
  menuButton: {
    borderTopWidth: 1,
    borderTopColor: "#88849C20",
    marginHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  menuButtonText: {
    color: "#88849C",
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
});

export default MessageMenu;
