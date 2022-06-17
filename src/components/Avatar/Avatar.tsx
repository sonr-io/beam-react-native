import React from "react";
import { StyleSheet, View } from "react-native";

import { User } from "../../types/Chat";
import IconUser from "../../icons/User";

export const Avatar = () => {
  return (
    <View style={styles.avatar}>
      <IconUser />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#1C1C3B",
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
});
