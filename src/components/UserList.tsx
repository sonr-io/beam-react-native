import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { User } from "../types/User";
import { Avatar } from "./Avatar/Avatar";

type Props = {
  sections: { title: string; data: User[] }[];
};
export const UserList = (props: Props) => {
  return (
    <SectionList
      sections={props.sections}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}>
          <Avatar user={item} />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.id}>{item.id}</Text>
          </View>
        </TouchableOpacity>
      )}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.listHeader}>{title}</Text>
      )}
      renderSectionFooter={({ section }) =>
        section.data.length <= 0 ? (
          <Text style={styles.empty}>empty</Text>
        ) : (
          <></>
        )
      }
      ItemSeparatorComponent={() => <View style={{ marginTop: 16 }} />}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "THICCCBOI_Bold",
    color: "#1D1A27",
  },
  id: {
    fontSize: 18,
    fontFamily: "THICCCBOI_Medium",
    color: "#88849C",
  },
  empty: {
    fontSize: 15,
    color: "#B7B4C7",
    textAlign: "center",
    fontStyle: "italic",
  },
  listHeader: {
    fontSize: 20,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#B7B4C7",
    marginBottom: 16,
  },
});