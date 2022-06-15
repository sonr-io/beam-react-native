import React from "react";
import { StyleSheet, View } from "react-native";

import { User } from "../../types/Chat";
import IconUser from "../../icons/User";

export const Avatar = (props: { user: User }) => {
  return (
    <View>
      {props.user.isOnline && <View style={styles.isOnline}></View>}
      <View style={styles.avatar}>
        <IconUser />
      </View>
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
    bottom: 0,
    right: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
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
