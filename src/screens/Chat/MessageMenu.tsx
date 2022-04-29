import React from "react";
import { Button, Platform, StyleSheet, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Params } from ".";
import BlurView from "../../components/BlurView";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "MessageMenu">;

const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message } = route.params;

  return (
    <BlurView intensity={75} style={styles.container}>
      <Text>{message.text}</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ios ? "#FFF0" : "#FFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default MessageMenu;
