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
        colors={["#4DD6F6", "#4D74FD"]}
        end={{ x: 0.54, y: 0.3 }}
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
    height: 300,
    position: "absolute",
  },
});
