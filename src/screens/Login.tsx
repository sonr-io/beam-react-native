import { USERS } from "@env";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { StackParams } from "../../App";
import { getChats, getUser, login } from "../lib/matrix";
import { client } from "../matrixClient";

interface PresetUser {
  username: string;
  password: string;
}

type Props = StackScreenProps<StackParams, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const presetUsers: PresetUser[] = JSON.parse(USERS || "[]");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (username: string, password: string) => {
    setError(false);
    setLoading(true);

    try {
      await login(username, password);
      const user = await getUser(client.getUserId());
      const chats = await getChats();

      chats
        .filter((chat) => !chat.isMember)
        .map((chat) => client.joinRoom(chat.id));

      navigation.navigate("Chat", { user, chats });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          autoFocus
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        {error && <Text style={styles.error}>Incorrect credentials</Text>}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => onLogin(username, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          {presetUsers.map(({ username, password }) => (
            <TouchableOpacity
              key={username}
              style={styles.presetUser}
              onPress={() => {
                onLogin(username, password);
              }}
            >
              <Text>{username}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  section: {
    flexDirection: "row",
    marginHorizontal: -10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  loginButton: {
    borderRadius: 4,
    backgroundColor: "dodgerblue",
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  presetUser: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    marginRight: 10,
  },
  error: {
    marginBottom: 20,
    color: "darkred",
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#00000088",
  },
});

export default LoginScreen;
