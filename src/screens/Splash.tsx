import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { LinearGradient } from "expo-linear-gradient";

import { StackParams } from "../../App";

import sonrLogo from "../../assets/sonr.png";
import { PrimaryButton } from "../components/PrimaryButton";
import BeamLogo from "../icons/Beam";
import { SecondaryButton } from "../components/SecondaryButton";

type Props = StackScreenProps<StackParams, "Login">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  let panelRef: any = null;

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          style={[styles.gradientContainer]}
          colors={["#63B6FF", "#1792FF", "#046DE8"]}
          locations={[0.0, 0.5, 1]}
          start={{ x: 0.6, y: 1.5 }}
          end={{ x: 0.4, y: -0.5 }}
        />
        <TouchableOpacity
          onPress={() => {
            panelRef.show(320);
          }}
          style={{ marginTop: 80 }}
        >
          <BeamLogo width="355" height="189" />
          <Text style={styles.h1}>BEAM</Text>
        </TouchableOpacity>
        <SlidingUpPanel
          ref={(c) => {
            panelRef = c;
          }}
        >
          <View style={styles.slidePanel}>
            <LinearGradient
              style={[styles.gradientContainer]}
              colors={["#686375", "#1D1A27"]}
              locations={[0.0, 1]}
              start={{ x: 0.6, y: 1.5 }}
              end={{ x: 0.4, y: -0.5 }}
            />
            <Text style={styles.subtitle2}>BEAM CONNECTS WITH</Text>

            <Image
              source={sonrLogo}
              style={styles.sonrLogo}
              onLoadEnd={() => panelRef.show(320)}
            />

            <PrimaryButton
              onPress={() => navigation.navigate("Login", {})}
              text="Create Account"
            />

            <SecondaryButton
              onPress={() => navigation.navigate("Login", {})}
              text="Secure Login"
              style={{ marginTop: 10 }}
            />

            <Text onPress={() => panelRef.hide()} style={styles.skipText}>
              Skip
            </Text>
          </View>
        </SlidingUpPanel>
      </View>
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
  slidePanel: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#686375",
    borderRadius: 36,
  },
  h1: {
    fontFamily: "THICCCBOI_Regular",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.01,
    textAlign: "center",
    color: "white",
  },
  subtitle2: {
    fontFamily: "THICCCBOI_Regular",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: 0.04,
    textAlign: "left",
    color: "white",
    marginTop: 24,
    marginBottom: 14,
  },
  sonrLogo: {
    height: 62,
    width: 182,
    marginBottom: 40,
  },
  skipText: {
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 16,
    letterSpacing: 0.02,
    color: "#1792FF",
    marginTop: 24,
  },
});

export default SplashScreen;
