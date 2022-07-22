import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackParams } from "../../App";

import BeamLogo from "../icons/Beam";
import { completeLogin } from "../lib/login";
import { loginWithSession } from "../lib/matrix";
import { AuthenticationComponent } from "@sonr-io/react-native-ui-components";

type Props = StackScreenProps<StackParams, "Login">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [sdk, setSdk] = useState(false);
  const onSuccessHandler = async (data: any) => {
    console.log("hello world", data);
    const client = await loginWithSession(
      data.matrixUsername,
      data.matrixPassword
    );
    await completeLogin(client, navigation);
  };
  const loadSession = async () => {
    const sessionUser = await AsyncStorage.getItem("sessionUser");
    const sessionToken = await AsyncStorage.getItem("sessionToken");

    if (!sessionUser || !sessionToken) {
      // navigation.replace("Login", {});
      setSdk(true);
      return;
    }

    const client = await loginWithSession(sessionUser, sessionToken);
    await completeLogin(client, navigation);
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradientContainer}
          colors={["#046DE8", "#63B6FF", "#1792FF"]}
          locations={[0, 0.5, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <TouchableOpacity
          onPress={() => {
            loadSession();
          }}
          style={{ marginTop: 120, alignItems: "center" }}
        >
          <BeamLogo width="355" height="189" />
          <Text style={styles.h1}>Beam</Text>
        </TouchableOpacity>
      </View>
      {sdk && <AuthenticationComponent onSuccess={onSuccessHandler} />}
    </>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  h1: {
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.01,
    textAlign: "center",
    color: "white",
  },
});

export default SplashScreen;
