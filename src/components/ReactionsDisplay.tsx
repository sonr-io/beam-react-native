import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

type Props = {
  reactions: string[];
  onPressReactions?: () => void;
};
export const ReactionsDisplay: React.FC<Props> = (props: Props) => {
  if (props.reactions.length <= 0) return <></>;

  return (
    <TouchableHighlight
      style={styles.reactionsContainer}
      onPress={props.onPressReactions}
      activeOpacity={0.5}
      underlayColor={"#1792FF"}
    >
      <>
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
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
