import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import React from "react";
import { Text, View } from "react-native";

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
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "Poppins_600SemiBold",
          marginBottom: 20,
          lineHeight: 32,
          backgroundImage:
            "-webkit-linear-gradient(314deg, #4D74FD, #4DAEF8, #4DFDF2)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          width: "fit-content",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
