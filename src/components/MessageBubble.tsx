import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  isIncoming: boolean;
  isLast: boolean;
};

export const MessageBubble = (props: Props) => {
  const messageStyles: {}[] = [
    styles.bubble,
    props.isIncoming ? styles.incoming : styles.outgoing,
  ];

  if (props.isLast) {
    messageStyles.push(
      props.isIncoming ? styles.incomingLast : styles.outgoingLast
    );
  }

  return (
    <View style={messageStyles}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  incoming: {
    alignSelf: "flex-start",
    marginRight: 40,
    backgroundColor: "#1792FF",
  },
  incomingLast: {
    borderBottomLeftRadius: 4,
  },
  outgoing: {
    alignSelf: "flex-end",
    marginLeft: 40,
    backgroundColor: "#777E90",
  },
  outgoingLast: {
    borderBottomRightRadius: 4,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FCFCFD",
  },
});
