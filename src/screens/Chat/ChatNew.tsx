import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Params } from ".";
import { GradientHeader } from "../../components/GradientHeader";

type Props = StackScreenProps<Params, "ChatNew">;

const ChatNew: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.listContainer}>
      <View style={styles.headerWithButton}>
        <View style={styles.title}>
          <GradientHeader text="New Chat" />
        </View>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 24 }}>×</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.nameInput} />
      <Button
        title="Start chat"
        onPress={() => navigation.navigate("ChatView", { id: "1" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  headerWithButton: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    flex: 1,
  },
  headerButton: {
    padding: 20,
    marginBottom: 10,
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
