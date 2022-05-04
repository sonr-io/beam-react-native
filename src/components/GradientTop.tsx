import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export const GradientTop = (props: Props) => {
  return (
    <View>
      <View style={styles.container}>{props.children}</View>
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
  headerFrame: {
    width: "100%",
    height: 300,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
  },
  gradientContainer: {
    width: "100%",
    height: 300,
    position: "absolute",
  },
});
