import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getTime } from "../lib/getTime";

type Props = {
  text: string;
  isIncoming: boolean;
  timestamp: number;
  showTimestamp: boolean;
};

export const MessageBubble = (props: Props) => {
  const bubbleStyles = [
    styles.bubble,
    props.isIncoming ? styles.bubbleIncoming : styles.bubbleOutgoing,
  ];

  const timeStyles = [
    styles.time,
    props.isIncoming ? styles.timeIncoming : styles.timeOutgoing,
  ];

  const textStyles = [
    styles.text,
    props.isIncoming ? styles.textIncoming : styles.textOutgoing,
  ];

  return (
    <View style={bubbleStyles}>
      {props.showTimestamp && (
        <Text style={timeStyles}>{getTime(props.timestamp)}</Text>
      )}
      <Text style={textStyles}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bubbleIncoming: {
    alignSelf: "flex-start",
    marginRight: 40,
    backgroundColor: "#F5F4FA",
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bubbleOutgoing: {
    alignSelf: "flex-end",
    marginLeft: 40,
    backgroundColor: "#1792FF",
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },

  text: {
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
  },
  textIncoming: {
    color: "#5E5B71",
  },
  textOutgoing: {
    color: "#FFFFFF",
  },

  time: {
    fontFamily: "Outfit_700Bold",
    fontSize: 10,
    marginVertical: 4,
  },
  timeIncoming: {
    color: "#B7B4C7",
  },
  timeOutgoing: {
    color: "#F5F4FA",
    textAlign: "right",
  },
});
