import React from "react";
import { StyleSheet, View } from "react-native";

import { User } from "../../types/User";

export const Avatar = (props: { user: User }) => {
  return (
    <View>
      {props.user.isOnline && <View style={styles.isOnline}></View>}
      <View style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  isOnline: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#1792FF",
    position: "absolute",
    zIndex: 100,
    left: 27,
    top: 27,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#C4C4C4",
  },
});
