import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Params } from ".";

import { Avatar } from "../../components/Avatar/Avatar";
import BlurView from "../../components/BlurView";

import { useChatContext } from "../../contexts/ChatContext";

import { users } from "../../_data/users";

const ios = Platform.OS === "ios";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { chats } = useChatContext();
  const inputRef = React.useRef<TextInput>(null);

  return (
    <>
      <View style={[styles.transparentHeader, { height: insets.top }]} />
      <View style={styles.modalContainer}>
        <BlurView intensity={100} style={styles.blur}>
          <View style={styles.headerWithButton}>
            <Text style={styles.title}>New Message</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>To:</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                inputRef.current?.focus();
              }}
            >
              <View style={styles.inputInnerContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.nameInput}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Text style={styles.snrLabel}>.snr</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <FlatList
            style={styles.userList}
            data={users}
            renderItem={({ item: user }) => (
              <TouchableOpacity
                style={styles.userListItem}
                onPress={() => {
                  const chat = chats.find((chat) => chat.name === user.id);
                  if (chat) {
                    navigation.goBack();
                    navigation.navigate("ChatView", { id: chat.id });
                  }
                }}
              >
                <Avatar user={user} />
                <View>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userId}>{user.id}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListHeaderComponent={<Text style={styles.recentLabel}>Recent</Text>}
            ItemSeparatorComponent={() => <View style={{ marginTop: 16 }} />}
          />
        </BlurView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  transparentHeader: {
    width: "100%",
    backgroundColor: "transparent",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: ios ? "rgba(255, 255, 255, 0.5)" : "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  blur: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  headerWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    flex: 1,
    fontSize: 28,
    lineHeight: 36,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#5E5B71",
  },
  cancelText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#88849C",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "THICCCBOI_Medium",
    color: "#5E5B71",
    marginRight: 8,
  },
  inputInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B7B4C7",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  nameInput: {
    fontSize: 16,
    fontFamily: "THICCCBOI_Medium",
    color: "#5E5B71",
  },
  snrLabel: {
    fontSize: 16,
    fontFamily: "THICCCBOI_Medium",
    color: "#B7B4C7",
  },
  userList: {
    marginTop: 24,
  },
  recentLabel: {
    fontSize: 20,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#B7B4C7",
    marginBottom: 16,
  },
  userListItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontFamily: "THICCCBOI_Bold",
    color: "#1D1A27",
  },
  userId: {
    fontSize: 18,
    fontFamily: "THICCCBOI_Medium",
    color: "#88849C",
  },
});

export default NewChat;
