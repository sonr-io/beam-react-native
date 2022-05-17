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
        <Text style={{ fontSize: 18 }}>» </Text>
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
    paddingTop: 2,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 8,
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
    marginBottom: 2,
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 12,
  },
  senderColorSelf: {
    color: "#1792FF",
  },
  senderColorOther: {
    color: "#88849C",
  },

  text: {
    fontFamily: "THICCCBOI_Medium",
    fontSize: 14,
    color: "#5E5B71",
    paddingLeft: 12,
  },
});
