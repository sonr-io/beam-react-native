import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Params } from ".";

type Props = StackScreenProps<Params, "MessageMenu">;

const MessageMenu: React.FC<Props> = ({ navigation, route }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text>{message.text}</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageMenu;
