import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const GradientTop: React.FC<Props> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, style, { marginTop: insets.top }]}>
        {children}
      </View>
      <LinearGradient
        style={[styles.gradientContainer, { height: 100 + insets.top }]}
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
    position: "absolute",
  },
});
