import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconFontSize from "../icons/FontSize";
import IconPlus from "../icons/Plus";
import IconSend from "../icons/Send";
import BlurView from "./BlurView";

const ios = Platform.OS === "ios";

type Props = {
  onSubmit: (message: string) => void;
  inputRef?: React.RefObject<TextInput>;
};
export const MessageInput = ({ onSubmit, inputRef }: Props) => {
  const [message, setMessage] = useState("");
  const insets = useSafeAreaInsets();

  const pushMessage = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
    <View style={styles.messageInputOuterContainer}>
      <BlurView
        intensity={80}
        style={[styles.messageInputBlur, { paddingBottom: insets.bottom + 8 }]}
      >
        {/* <View style={styles.messageToolbarButton}>
          <IconPlus fill="#5E5B71" />
        </View>
        <View style={styles.messageToolbarButton}>
          <IconFontSize />
        </View> */}
        <View style={styles.messageInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.messageInput}
            multiline
            placeholder="New message"
            placeholderTextColor="#88849C"
            value={message}
            onChangeText={(message) => setMessage(message)}
          />
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity onPress={pushMessage}>
              {!!message ? <IconSend /> : <View style={{ height: 32 }} />}
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
      {ios && <KeyboardSpacer topSpacing={-insets.bottom} />}
    </View>
  );
};

const styles = StyleSheet.create({
  messageInputOuterContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  messageInputBlur: {
    backgroundColor: ios ? "rgba(136, 132, 156, 0.1)" : "#FFF",
    padding: 8,
    flexDirection: "row",
  },
  messageToolbarButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    marginRight: 8,
  },
  messageInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ios ? "rgba(255, 255, 255, 0.7)" : "#FFF",
    borderColor: "#D9D7E6",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingRight: 4,
    paddingLeft: 16,
    maxHeight: 230,
  },
  messageInput: {
    fontFamily: "THICCCBOI_Medium",
    fontSize: 16,
    lineHeight: 20,
    color: "#5E5B71",
    height: "100%",
    flex: 1,
  },
});
