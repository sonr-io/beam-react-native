import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import sonrLogo from "../../assets/sonr.png";

type Props = {
  navigation: any;
  show: any;
  createButtonHandler: any;
  secureButtonHandler: any;
  skipButtonHandler: any;
};

export const SlidingUpPanelComponent = (props: Props) => {
  return (
    <SlidingUpPanel>
      <View style={styles.slidePanel}>
        <LinearGradient
          style={[styles.gradientContainer]}
          colors={["#686375", "#1D1A27"]}
          locations={[0.0, 1]}
          start={{ x: 0.6, y: 1.5 }}
          end={{ x: 0.4, y: -0.5 }}
        />
        <Text style={styles.subtitle2}>BEAM CONNECTS WITH</Text>

        <Image source={sonrLogo} style={styles.sonrLogo} />

        <PrimaryButton
          onPress={() => props.createButtonHandler()}
          text="Create Account"
        />

        <SecondaryButton
          onPress={() => props.secureButtonHandler()}
          text="Secure Login"
          style={{ marginTop: 10 }}
        />

        <Text onPress={() => props.skipButtonHandler()} style={styles.skipText}>
          Skip
        </Text>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  slidePanel: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#686375",
    borderRadius: 36,
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
