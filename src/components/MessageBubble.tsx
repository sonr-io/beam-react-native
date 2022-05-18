import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getTime } from "../lib/getTime";
import { normalizeUrl } from "../lib/normalizeUrl";

import IconForwarded from "../icons/Forwarded";

type Props = {
  text: string;
  isIncoming: boolean;
  timestamp: number;
  showTimestamp: boolean;
  reactions: string[];
  forwardedFrom?: string;
};

export const MessageBubble = (props: Props) => {
  const stylesCustom = props.isIncoming ? stylesIncoming : stylesOutgoing;
  const parsedText = props.text.split(" ").map((word) => ({
    word,
    url: normalizeUrl(word),
  }));

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
        <View style={stylesCommon.textContainer}>
          {parsedText.map(({ word, url }, index) => {
            const Word = () => (
              <Text style={[stylesCommon.text, stylesCustom.text]}>
                {word + (index === parsedText.length - 1 ? "" : " ")}
              </Text>
            );

            return url ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(url);
                }}
              >
                <Word />
              </TouchableOpacity>
            ) : (
              <Word />
            );
          })}
        </View>
      </View>

      {props.reactions.length > 0 && (
        <View style={stylesCommon.reactionsContainer}>
          {props.reactions.length <= 3 ? (
            props.reactions.map((reaction, i) => (
              <Text key={i} style={{ fontSize: 12 }}>
                {reaction}
              </Text>
            ))
          ) : (
            <>
              <Text style={{ fontSize: 12 }}>{props.reactions[0]}</Text>
              <Text style={{ fontSize: 12 }}>{props.reactions[1]}</Text>
              <Text>+{props.reactions.length - 2}</Text>
            </>
          )}
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

  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontFamily: "THICCCBOI_Medium",
    fontSize: 16,
    lineHeight: 20,
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

  reactionsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
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
