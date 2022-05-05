import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import IconNewChat from "../icons/NewChat";

interface Props {
  onPress: () => void;
}

const NewChatButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconFrame}>
          <IconNewChat />
        </View>
        <MaskedView maskElement={<View style={styles.buttonFrame} />}>
          <LinearGradient
            style={{ height: 56, width: 56 }}
            colors={["#4D74FD", "#4DAEF8", "#4DFDF2"]}
            end={{ x: 0.1, y: 0.2 }}
          />
        </MaskedView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
  iconFrame: {
    position: "absolute",
    zIndex: 10,
    right: 16,
    bottom: 16,
  },
  buttonFrame: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "white",
  },
});

export { NewChatButton };
