import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";

interface Props {
  onPress: () => void;
}

const NewChatButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ButtonImage />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 30,
    bottom: 25,
    right: 25,
  },
});

const ButtonImage = () => (
  <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
    <Rect width={56} height={56} rx={28} fill="url(#paint0_linear_2507_2014)" />
    <Path
      d="M20.053 35.5c.063 0 .125-.006.188-.016l5.256-.922a.306.306 0 00.166-.087l13.246-13.247a.312.312 0 000-.44l-5.193-5.197a.31.31 0 00-.222-.091.31.31 0 00-.222.09L20.025 28.838a.317.317 0 00-.087.166l-.922 5.256a1.046 1.046 0 00.293.932c.207.2.466.309.744.309zm2.106-5.45l11.335-11.331 2.29 2.29L24.45 32.341l-2.778.49.487-2.781zM39.5 38.125h-23c-.553 0-1 .447-1 1v1.125c0 .138.113.25.25.25h24.5a.25.25 0 00.25-.25v-1.125c0-.553-.447-1-1-1z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2507_2014"
        x1={56.68}
        y1={56}
        x2={0}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4D74FD" />
        <Stop offset={0.427083} stopColor="#4DAEF8" />
        <Stop offset={1} stopColor="#4DFDF2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export { NewChatButton };
