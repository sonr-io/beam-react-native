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
import Svg, { Path } from "react-native-svg";

import { Params } from ".";
import BlurView from "../../components/BlurView";
import { EmojiSelector } from "../../components/EmojiSelector";
import { MessageBubble } from "../../components/MessageBubble";
import { MessageInput } from "../../components/MessageInput";
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
  const { addReaction, addMessage } = useChatContext();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const pushEmoji = (emoji: string) => {
    addReaction(chatId, message.id, emoji);
  };
  const pushMessage = (text: string) => {
    addMessage(chatId, text, message.id);
    navigation.goBack();
  };

  const inputRef = useRef<TextInput>(null);

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
              <IconPlus />
            </TouchableOpacity>
          </View>

          {showEmojiSelector && (
            <EmojiSelector onSelectEmoji={(e) => pushEmoji(e)} />
          )}

          {!showEmojiSelector && (
            <>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => inputRef.current?.focus()}
              >
                <Text style={styles.menuButtonText}>Reply</Text>
                <IconReply />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
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

const IconReply = () => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M9.875 11a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm4.688 0a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm-9.375 0a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm15.497-4.069A10.503 10.503 0 0011 .5h-.047A10.475 10.475 0 00.5 11.05a10.533 10.533 0 001.125 4.684v3.563a1.078 1.078 0 001.078 1.078h3.565a10.533 10.533 0 004.685 1.125h.05c1.403 0 2.765-.272 4.047-.804a10.417 10.417 0 003.347-2.231 10.477 10.477 0 003.103-7.418 10.463 10.463 0 00-.815-4.116zm-3.542 10.266A8.673 8.673 0 0111 19.719h-.04a8.75 8.75 0 01-4.057-1.02l-.197-.105h-3.3v-3.3l-.105-.197a8.75 8.75 0 01-1.02-4.057 8.665 8.665 0 012.522-6.183 8.653 8.653 0 016.16-2.576h.04c1.171 0 2.308.228 3.38.678a8.664 8.664 0 012.788 1.875 8.683 8.683 0 012.552 6.206 8.685 8.685 0 01-2.58 6.157z"
        fill="#88849C"
      />
    </Svg>
  );
};

const IconForward = () => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M20.83 10.691L1.225.861a.375.375 0 00-.532.424l2.02 8.256a.37.37 0 00.244.265l3.461 1.188-3.459 1.188a.367.367 0 00-.241.265L.693 20.713a.376.376 0 00.532.424l19.605-9.773a.386.386 0 00.169-.166.38.38 0 00-.169-.507zM3.004 18.366l1.179-4.819 6.918-2.374a.188.188 0 00.117-.117.19.19 0 00-.117-.24L4.182 8.445l-1.174-4.8 14.719 7.38-14.723 7.341z"
        fill="#88849C"
      />
    </Svg>
  );
};

const IconCopy = () => {
  return (
    <Svg width={18} height={22} viewBox="0 0 18 22" fill="none">
      <Path
        d="M16.5.5H3.937a.188.188 0 00-.187.188V2c0 .103.084.188.188.188h11.624v16.125c0 .103.085.187.188.187h1.313a.188.188 0 00.187-.188V1.25A.75.75 0 0016.5.5zm-3 3h-12a.75.75 0 00-.75.75v12.438c0 .2.08.39.22.53l4.062 4.062a.78.78 0 00.173.129v.044h.099c.082.03.169.047.258.047H13.5a.75.75 0 00.75-.75V4.25a.75.75 0 00-.75-.75zM5.203 19.067l-2.018-2.02h2.018v2.02zm7.36.745h-5.86v-3.328a.937.937 0 00-.937-.937H2.437V5.187h10.126v14.625z"
        fill="#88849C"
      />
    </Svg>
  );
};
