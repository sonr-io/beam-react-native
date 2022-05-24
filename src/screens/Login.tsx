import { USERS } from "@env";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { StackParams } from "../../App";
import { useMatrixClientContext } from "../contexts/MatrixClientContext";
import { login } from "../lib/matrix";

interface PresetUser {
  username: string;
  password: string;
}

type Props = StackScreenProps<StackParams, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setClient } = useMatrixClientContext();
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const presetUsers: PresetUser[] = JSON.parse(USERS || "[]");
  const [error, setError] = React.useState(false);

  const onLogin = async (user: string, password: string) => {
    try {
      const client = await login(user, password);
      setClient(client);
      setError(false);
    } catch (_) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        autoCapitalize={"none"}
        autoCorrect={false}
        style={styles.input}
        placeholder="username"
        onChangeText={(text) => {
          setUser(text);
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

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLogin(user, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("Chat", {});
          }}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

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
  button: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "dodgerblue",
    marginHorizontal: 10,
    padding: 10,
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
});

export default LoginScreen;
