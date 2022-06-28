import React from "react";
import { StyleSheet, Text, View } from "react-native";
import seedrandom from "seedrandom";

import { User } from "../../types/Chat";

const backgroundColors = [
  "#7744E3",
  "#0053B5",
  "#009C82",
  "#1D1A27",
  "#C20037",
];

const getColor = (id: string) => {
  const rng = seedrandom(id);
  const max = backgroundColors.length;
  const index = Math.floor(rng() * max);
  return backgroundColors[index];
};

interface Props {
  user: User;
}

export const Avatar: React.FC<Props> = ({ user }) => {
  const color = getColor(user.id);
  const initials = user.id.charAt(1).toUpperCase() + user.id.charAt(2);
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderRadius: 40,
    marginRight: 12,
  },
  initials: {
    color: "#F6F5FA",
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 24,
  },
});
