import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";
import { Avatar } from "../../components/Avatar/Avatar";
import BlurView from "../../components/BlurView";
import { EmojiPresetBar } from "../../components/Emojis/EmojiPresetBar";
import { EmojiSelector } from "../../components/Emojis/EmojiSelector";
import { MessageBubble } from "../../components/MessageBubble";
import { MessageInput } from "../../components/MessageInput";
import { ReactionsDisplay } from "../../components/ReactionsDisplay";
import { useUserContext } from "../../contexts/UserContext";
import IconForward from "../../icons/Forward";
import IconReply from "../../icons/Reply";
import { charFromEmojiObject } from "../../lib/emoji";
import nameFromMatrixId from "../../lib/nameFromMatrixId";
import { client } from "../../matrixClient";
import { Emoji } from "../../types/Emoji";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "MessageMenu">;
const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message, chatId } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useUserContext();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const pushEmoji = (emoji: Emoji) => {
    navigation.goBack();
    client.sendMessage(chatId, {
      msgtype: "m.reaction",
      body: "",
      messageId: message.id,
      parentText: message.text,
      emoji: charFromEmojiObject(emoji),
    });
  };

  const pushMessage = (text: string) => {
    navigation.goBack();
    client.sendMessage(chatId, {
      msgtype: "m.text",
      body: text,
      parentId: message.id,
      parentSender: message.sender,
      parentText: message.text,
    });
  };

  const handleEmojiSelectorVisibility = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const inputRef = useRef<TextInput>(null);

  const onForward = () => {
    navigation.goBack();
    navigation.navigate("ForwardMenu", {
      text: message.text,
      from: nameFromMatrixId(message.sender.id),
    });
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
          reactionsDisplay={
            <ReactionsDisplay
              reactions={message.reactions.map((r) => r.emoji)}
              onPressReactions={() => setShowReactions(!showReactions)}
            />
          }
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
              {showReactions && (
                <View style={styles.reactionsContainer}>
                  <FlatList
                    data={message.reactions}
                    keyExtractor={(item) => `${item.emoji}${item.user.id}`}
                    renderItem={({ item, index }) => (
                      <View style={styles.menuItem}>
                        <Avatar />

                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={1} style={styles.userName}>
                            {item.user.name}
                          </Text>
                          <Text numberOfLines={1} style={styles.userId}>
                            {item.user.id}
                          </Text>
                        </View>

                        <Text>{item.emoji}</Text>
                      </View>
                    )}
                  />
                </View>
              )}

              {!showReactions && (
                <>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => inputRef.current?.focus()}
                  >
                    <Text style={styles.menuButtonText}>Reply</Text>
                    <IconReply />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={onForward}>
                    <Text style={styles.menuButtonText}>Forward</Text>
                    <IconForward />
                  </TouchableOpacity>
                </>
              )}
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
  menuItem: {
    borderTopWidth: 1,
    borderTopColor: "#88849C20",
    marginHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  menuButtonText: {
    color: "#696376",
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },

  reactionsContainer: {
    maxHeight: 300,
    overflow: "scroll",
  },

  userName: {
    fontFamily: "THICCCBOI_Medium",
    color: "#39324A",
    fontSize: 16,
  },
  userId: {
    fontFamily: "THICCCBOI_Medium",
    color: "#696376",
    fontSize: 14,
  },
});

export default MessageMenu;
