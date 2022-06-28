import React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const SecondaryButton: React.FC<Props> = ({ onPress, text, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 48,
    width: 296,
    borderColor: "#1792FF",
    borderWidth: 1,
    borderStyle: "solid",
  },
  buttonText: {
    textAlign: "center",
    color: "#1792FF",
    padding: 14,
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 20,
    letterSpacing: 0,
  },
});

export { SecondaryButton };
