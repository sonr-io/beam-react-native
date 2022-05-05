import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  senderName: string;
  selfReply: boolean;
  isIncoming: boolean;
};

export const ReplyBubble = (props: Props) => {
  const alignmentStyle = props.isIncoming
    ? styles.alignIncoming
    : styles.alignOutgoing;

  const senderColorStyle = props.selfReply
    ? styles.senderColorSelf
    : styles.senderColorOther;

  return (
    <View style={[styles.container, alignmentStyle]}>
      <Text style={[styles.sender, senderColorStyle]}>
        {props.selfReply ? "You" : props.senderName}
      </Text>
      <Text style={styles.text} numberOfLines={1}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#F5F4FA",
    borderRadius: 12,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  alignIncoming: {
    alignSelf: "flex-start",
    marginRight: 35,
  },
  alignOutgoing: {
    alignSelf: "flex-end",
    marginLeft: 35,
  },

  sender: {
    marginBottom: 4,
    fontFamily: "Outfit_400Regular",
    fontSize: 12,
  },
  senderColorSelf: {
    color: "#1792FF",
  },
  senderColorOther: {
    color: "#88849C",
  },

  text: {
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
    color: "#5E5B71",
  },
});
