import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const GradientTop: React.FC<Props> = ({ children, style }) => {
  return (
    <View>
      <View style={[styles.container, style]}>{children}</View>
      <LinearGradient
        style={styles.gradientContainer}
        colors={["#4D74FD", "#4DAEF8", "#4DFDF2"]}
        locations={[0.0, 0.5, 1]}
        start={{ x: 0.6, y: 1.5 }}
        end={{ x: 0.4, y: -0.5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  gradientContainer: {
    width: "100%",
    height: 96,
    position: "absolute",
  },
});
