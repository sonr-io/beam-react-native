import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useChatContext } from "../contexts/ChatContext";

import IconCheckCircle from "../icons/CheckCircle";
import IconClose from "../icons/Close";

import { User } from "../types/User";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserList } from "./UserList";

interface Props {
  onPressGo?: (value: string) => void;
  onUserSelected: (user: User) => void;
  markedUsers?: Set<string>;
  onUnmarkUser?: (id: string) => void;
  onSend?: () => void;
}

const UserSelector: React.FC<Props> = ({
  onPressGo,
  onUserSelected,
  markedUsers,
  onUnmarkUser,
  onSend,
}) => {
  const { chats } = useChatContext();
  const insets = useSafeAreaInsets();
  const users = chats.map((chat) => chat.user);

  const inputRef = React.useRef<TextInput>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [userList, setUserList] = React.useState(users);

  const onInputChange = (input: string) => {
    setInputValue(input);
    setError(false);
    const filteredList = users.filter((user) => user.id.startsWith(input));
    setUserList(filteredList);
  };

  return (
    <>
      <View style={{ marginBottom: 24 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>To:</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              inputRef.current?.focus();
            }}
          >
            <View
              style={[
                styles.inputInnerContainer,
                error && { borderColor: "#FF2866" },
              ]}
            >
              <TextInput
                ref={inputRef}
                style={styles.nameInput}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={onInputChange}
              />
              <Text style={styles.snrLabel}>.snr</Text>
              {onPressGo && (
                <TouchableOpacity
                  onPress={() => {
                    try {
                      onPressGo(inputValue);
                    } catch {
                      setError(true);
                    }
                  }}
                >
                  <Text style={{ color: "#5E5B71" }}>Go</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {error && <Text style={styles.errorMessage}>Invalid .snr domain</Text>}
        <View style={styles.selectedUsers}>
          {[...(markedUsers?.values() ?? [])].map((id) => (
            <View style={styles.selectedUserContainer} key={id}>
              <Text style={styles.selectedUser}>{id}</Text>
              <TouchableOpacity
                onPress={() => onUnmarkUser && onUnmarkUser(id)}
              >
                <IconClose />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <UserList
        sections={[{ title: "Recent", data: userList }]}
        onPress={onUserSelected}
      />
      {onSend && (
        <View
          style={[styles.sendButtonContainer, { paddingBottom: insets.bottom }]}
        >
          <TouchableOpacity style={styles.sendButton} onPress={onSend}>
            <Text style={styles.sendButtonLabel}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    fontSize: 16,
    fontFamily: "THICCCBOI_Medium",
    color: "#B7B4C7",
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: "THICCCBOI_Medium",
    color: "#FF2866",
    marginTop: 4,
    marginLeft: 30,
  },
  selectedUsers: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  selectedUserContainer: {
    flexDirection: "row",
    backgroundColor: "#1792FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
    marginTop: 8,
  },
  selectedUser: {
    fontSize: 14,
    fontFamily: "THICCCBOI_Medium",
    color: "#F5F4FA",
    marginRight: 8,
  },
  sendButtonContainer: {
    width: "100%",
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "rgba(136, 132, 156, 0.1)",
  },
  sendButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1792FF",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 4,
    paddingVertical: 10,
  },
  sendButtonLabel: {
    fontFamily: "THICCCBOI_ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default UserSelector;
