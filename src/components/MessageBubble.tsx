import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getTime } from "../lib/getTime";

type Props = {
  text: string;
  isIncoming: boolean;
  timestamp: number;
  showTimestamp: boolean;
  reactions: string[];
};

export const MessageBubble = (props: Props) => {
  const bubbleContainerStyles = props.isIncoming
    ? styles.bubbleContainerIncoming
    : styles.bubbleContainerOutgoing;

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
    <View style={bubbleContainerStyles}>
      <View style={bubbleStyles}>
        {props.showTimestamp && (
          <Text style={timeStyles}>{getTime(props.timestamp)}</Text>
        )}
        <Text style={textStyles}>{props.text}</Text>
      </View>
      {props.reactions.length > 0 && (
        <View style={styles.reactionsContainer}>
          {props.reactions.map((reaction, i) => (
            <Text key={i} style={{ fontSize: 12 }}>
              {reaction}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainerIncoming: {
    alignSelf: "flex-start",
    marginRight: 40,
  },
  bubbleContainerOutgoing: {
    alignSelf: "flex-end",
    marginLeft: 40,
  },

  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bubbleIncoming: {
    backgroundColor: "#F5F4FA",
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bubbleOutgoing: {
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

  reactionsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: -3,
    marginRight: 8,
    backgroundColor: "#D9D7E6",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF44",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    padding: 4,
    marginBottom: 2,
  },
});
