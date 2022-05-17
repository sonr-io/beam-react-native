import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";

import { Avatar } from "./Avatar/Avatar";

import { useChatContext } from "../contexts/ChatContext";
import IconCheckCircle from "../icons/CheckCircle";
import { User } from "../types/User";

interface Props {
  onPressGo?: (value: string) => void;
  onUserSelected: (user: User) => void;
  markedUsers?: Set<string>;
  onSend?: () => void;
}

const UserSelector: React.FC<Props> = ({
  onPressGo,
  onUserSelected,
  markedUsers,
  onSend,
}) => {
  const { chats } = useChatContext();
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
                <Text>Go</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {error && <Text style={styles.errorMessage}>Invalid .snr domain</Text>}
      <FlatList
        style={styles.userList}
        data={userList}
        renderItem={({ item: user }) => (
          <TouchableOpacity
            style={styles.userListItem}
            onPress={() => {
              onUserSelected(user);
            }}
          >
            <Avatar user={user} />
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userId}>{user.id}</Text>
            </View>
            <View style={{ flex: 1 }} />
            {markedUsers?.has(user.id) && <IconCheckCircle />}
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          userList.length > 0 ? (
            <Text style={styles.recentLabel}>Recent</Text>
          ) : (
            <></>
          )
        }
        ItemSeparatorComponent={() => <View style={{ marginTop: 16 }} />}
      />
      {onSend && <Button title="Send" onPress={onSend} />}
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

export default UserSelector;
