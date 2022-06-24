import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { User } from "../../types/Chat";

interface Props {
  user: User;
}

export const Avatar: React.FC<Props> = ({ user }) => {
  const initials = user.id.charAt(1).toUpperCase() + user.id.charAt(2);
  return (
    <View style={styles.avatar}>
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
    backgroundColor: "#1C1C3B",
  },
  initials: {
    color: "#F6F5FA",
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 24,
  },
});
