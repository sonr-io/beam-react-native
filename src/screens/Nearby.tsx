import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NearbyScreen = () => (
  <View style={styles.container}>
    <Text>Nearby screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NearbyScreen;
