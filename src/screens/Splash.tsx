import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StackParams } from "../../App";

type Props = StackScreenProps<StackParams, "Splash">;
const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate("Login", {});
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    </View>
  );
};

export default SplashScreen;
