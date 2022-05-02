import React from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { GradientHeader } from "../../components/GradientHeader";

type Props = {
  visible: boolean;
  onClose: () => void;
  navigateToChat: (id: string) => void;
};

export const ChatNewModal = (props: Props) => {
  const onPress = () => {
    props.navigateToChat("1");
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.headerWithButton}>
          <View style={styles.title}>
            <GradientHeader text="New Chat" />
          </View>
          <TouchableOpacity style={styles.headerButton} onPress={props.onClose}>
            <Text style={{ fontSize: 24 }}>×</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.nameInput} />
        <Button title="Start chat" onPress={onPress} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 50,
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
