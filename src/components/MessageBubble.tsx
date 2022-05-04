import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getTime } from "../lib/getTime";

type Props = {
  text: string;
  isIncoming: boolean;
  isLast: boolean;
  timestamp: number;
};

export const MessageBubble = (props: Props) => {
  const styleLast = props.isLast
    ? props.isIncoming
      ? styles.incomingLast
      : styles.outgoingLast
    : {};

  return props.isIncoming ? (
    <View style={[styles.bubbleContainer, styles.incoming, styleLast]}>
      <Text style={styles.time}>{getTime(props.timestamp)}</Text>
      <Text style={styles.textIncoming}>{props.text}</Text>
    </View>
  ) : (
    <View style={[styles.bubbleContainer, styles.outgoing, styleLast]}>
      <Text style={styles.time}>{getTime(props.timestamp)}</Text>
      <Text style={styles.textOutgoing}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  incoming: {
    alignSelf: "flex-start",
    marginRight: 40,
    backgroundColor: "#F5F4FA",
  },
  incomingLast: {
    borderBottomLeftRadius: 4,
  },
  outgoing: {
    alignSelf: "flex-end",
    marginLeft: 40,
    backgroundColor: "#1792FF",
  },
  outgoingLast: {
    borderBottomRightRadius: 4,
  },
  time: {
    fontFamily: "Outfit_700Bold",
    fontSize: 10,
    color: "#B7B4C7",
  },
  textIncoming: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#5E5B71",
  },
  textOutgoing: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FCFCFD",
  },
});
