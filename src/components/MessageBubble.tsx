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
  const stylesCustom = props.isIncoming ? stylesIncoming : stylesOutgoing;
  return (
    <View style={stylesCustom.container}>
      <View style={[stylesCommon.bubble, stylesCustom.bubble]}>
        {props.showTimestamp && (
          <Text style={[stylesCommon.time, stylesCustom.time]}>
            {getTime(props.timestamp)}
          </Text>
        )}
        <Text style={[stylesCommon.text, stylesCustom.text]}>{props.text}</Text>
      </View>
      {props.reactions.length > 0 && (
        <View style={stylesCommon.reactionsContainer}>
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

const stylesCommon = StyleSheet.create({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
  },
  time: {
    fontFamily: "Outfit_700Bold",
    fontSize: 10,
    marginVertical: 4,
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

const stylesIncoming = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginRight: 40,
  },
  bubble: {
    backgroundColor: "#F5F4FA",
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  text: {
    color: "#5E5B71",
  },
  time: {
    color: "#B7B4C7",
  },
});

const stylesOutgoing = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginLeft: 40,
  },
  bubble: {
    backgroundColor: "#1792FF",
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  text: {
    color: "#FFFFFF",
  },
  time: {
    color: "#F5F4FA",
    textAlign: "right",
  },
});
