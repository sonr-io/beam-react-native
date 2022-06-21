import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

import { getTime } from "../lib/getTime";
import { splitMessageText } from "../lib/splitMessageText";

import IconForwarded from "../icons/Forwarded";

type Props = {
  text: string;
  isIncoming: boolean;
  timestamp: number;
  showTimestamp: boolean;
  forwardedFrom?: string;
  reactionsDisplay: JSX.Element;
};

export const MessageBubble = (props: Props) => {
  const stylesCustom = props.isIncoming ? stylesIncoming : stylesOutgoing;
  const splitText = splitMessageText(props.text);

  return (
    <View style={stylesCustom.container}>
      <View style={[stylesCommon.bubble, stylesCustom.bubble]}>
        {props.showTimestamp && (
          <Text style={[stylesCommon.time, stylesCustom.time]}>
            {getTime(props.timestamp)}
          </Text>
        )}

        {props.forwardedFrom && (
          <View style={stylesCommon.forwardContainer}>
            <IconForwarded fill={props.isIncoming ? "#B7B4C7" : "#FFF8"} />
            <Text style={[stylesCustom.forward, stylesCommon.forward]}>
              Forwarded from {props.forwardedFrom}
            </Text>
          </View>
        )}

        <Text style={[stylesCommon.text, stylesCustom.text]}>
          {splitText.map(({ word, separator, url }, index) => {
            return url ? (
              <Text key={index}>
                <Link text={word} url={url} index={index} />
                {separator}
              </Text>
            ) : (
              word + separator
            );
          })}
        </Text>
      </View>

      {props.reactionsDisplay}
    </View>
  );
};

const Link = (props: { text: string; url: string; index: number }) => {
  return (
    <Text
      key={props.index}
      onPress={() => {
        Linking.openURL(props.url);
      }}
      style={{ textDecorationLine: "underline" }}
    >
      {props.text}
    </Text>
  );
};

const stylesCommon = StyleSheet.create({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bubbleIncoming: {
    alignSelf: "flex-start",
    marginRight: 100,
    backgroundColor: "#F5F4FA",
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bubbleOutgoing: {
    alignSelf: "flex-end",
    marginLeft: 100,
    backgroundColor: "#1792FF",
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },

  text: {
    fontFamily: "THICCCBOI_Medium",
    fontSize: 16,
    lineHeight: 22,
  },
  time: {
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 10,
    lineHeight: 16,
  },

  forwardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forward: {
    fontSize: 10,
    fontFamily: "THICCCBOI_ExtraBold",
    marginLeft: 2,
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
  forward: {
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
    color: "#FFF8",
    textAlign: "right",
  },
  forward: {
    color: "#FFF8",
  },
});
