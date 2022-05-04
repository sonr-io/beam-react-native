import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const GradientHeader = (props: { text: string }) => {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  const { text } = props;

  if (!fontsLoaded || !text) {
    return <></>;
  }

  return (
    <View>
      <MaskedView
        style={{ height: 80 }}
        maskElement={<Text style={styles.text}>{text}</Text>}
      >
        <View>
          <LinearGradient
            style={{ height: 80 }}
            colors={["#4D74FD", "#4DAEF8", "#4DFDF2"]}
            end={{ x: 0.1, y: 0.2 }}
          />
        </View>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  mask: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 20,
    lineHeight: 32,
  },
});
