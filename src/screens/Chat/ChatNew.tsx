import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Params } from ".";

type ChatNewProps = StackScreenProps<Params, "New">;

const ChatNew = ({ navigation }: ChatNewProps) => {
  return (
    <View style={styles.listContainer}>
      <TextInput style={styles.nameInput} />
      <Button title="Start chat" onPress={() => navigation.navigate("View", { id: "1" })} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  nameInput: {
    borderColor: "#B1B5C3",
    borderWidth: 2,
    borderRadius: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    height: 48,
    paddingHorizontal: 16,
  },
});

export default ChatNew;
