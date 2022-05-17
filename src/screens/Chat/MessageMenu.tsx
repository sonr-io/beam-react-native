import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import BlurView from "../../components/BlurView";
import { EmojiSelector } from "../../components/Emojis/EmojiSelector";
import { MessageBubble } from "../../components/MessageBubble";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";
import IconPlus from "../../icons/Plus";

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
  const { addReaction } = useChatContext();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const pushEmoji = (emoji: string) => {
    addReaction(chatId, message.id, emoji);
  };

  const animationOfEmojisToggleButton = new Animated.Value(
    showEmojiSelector ? 0 : 1
  );

  Animated.timing(animationOfEmojisToggleButton, {
    toValue: showEmojiSelector ? 1 : 0,
    duration: 100,
    useNativeDriver: true,
  }).start();

  const rotateEmojisToggleButtonInterpolate =
    animationOfEmojisToggleButton.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
    });

  const animatedStylesForEmojisToggleButton = {
    transform: [{ rotate: rotateEmojisToggleButtonInterpolate }],
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
          <View style={styles.emojiPreset}>
            <EmojiReaction emoji="👍" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="✅" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="❤" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="☕" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="📅" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="💥" onPress={(e) => pushEmoji(e)} />
            <EmojiReaction emoji="😎" onPress={(e) => pushEmoji(e)} />

            <TouchableOpacity
              onPress={() => setShowEmojiSelector(!showEmojiSelector)}
              style={styles.emojiShowSelector}
            >
              <Animated.View style={animatedStylesForEmojisToggleButton}>
                <IconPlus />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {showEmojiSelector && (
            <EmojiSelector onSelectEmoji={(e) => pushEmoji(e)} />
          )}

          {!showEmojiSelector && (
            <>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Forward</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Copy</Text>
              </TouchableOpacity>
            </>
          )}
        </BlurView>
      </View>
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
  emojiPreset: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  emojiShowSelector: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 4,
    paddingRight: 4,
  },
  emojiButton: {
    padding: 4,
  },
  emojiDisplay: {
    fontSize: 20,
  },
  menuButton: {
    borderTopWidth: 1,
    borderTopColor: "#88849C20",
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  menuButtonText: {
    color: "#88849C",
    fontFamily: "THICCCBOI_Bold",
    fontSize: 16,
  },
});

export default MessageMenu;
