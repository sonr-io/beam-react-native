import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  isIncoming: boolean;
};

export const ReplyBubble = (props: Props) => {
  const alignmentStyle = props.isIncoming
    ? styles.alignIncoming
    : styles.alignOutgoing;

  return (
    <View style={[styles.container, alignmentStyle]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#F5F4FA",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
    color: "#5E5B71",
  },
  alignIncoming: {
    alignSelf: "flex-start",
  },
  alignOutgoing: {
    alignSelf: "flex-end",
  },
});
