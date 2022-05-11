import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";

import BlurView from "../../components/BlurView";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.transparentHeader, { height: insets.top }]} />
      <View style={styles.modalContainer}>
        <BlurView intensity={100} style={styles.blur}>
          <View style={styles.headerWithButton}>
            <Text style={styles.title}>New Message</Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ fontSize: 24 }}>×</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.nameInput} />
          <Button
            title="Start chat"
            onPress={() => {
              navigation.goBack();
              navigation.navigate("ChatView", { id: "1" });
            }}
          />
        </BlurView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  transparentHeader: {
    width: "100%",
    backgroundColor: "transparent",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: ios ? "rgba(255, 255, 255, 0.5)" : "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  blur: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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

export default NewChat;
