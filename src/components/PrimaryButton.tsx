import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onPress: () => void;
  text: string;
}

const PrimaryButton: React.FC<Props> = ({ onPress, text }) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          style={styles.buttonGradient}
          colors={["#63B6FF", "#1792FF", "#046DE8"]}
          locations={[0.0, 0.5, 1]}
          start={{ x: 0.6, y: 1.5 }}
          end={{ x: 0.4, y: -0.5 }}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    height: 48,
    width: 296,
  },
  buttonGradient: {
    borderRadius: 6,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    padding: 14,
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 20,
    letterSpacing: 0,
  },
});

export { PrimaryButton };
