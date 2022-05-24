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

const onLogin = async (_user?: string, _password?: string) => {
  try {
      const client = await login(_user ?? user, _password ?? password);
      setClient(client);
      setError(false);
    } catch (_) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {presetUsers.map(({ username, password }) => (
        <Button
          key={username}
          title={username}
          onPress={() => {
            onLogin(username, password);
          }}
        />
      ))}
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
      {error && (
        <Text style={{ marginBottom: 20, color: "darkred" }}>
          Incorrect credentials
        </Text>
      )}
      <View style={{ flexDirection: "row", marginHorizontal: -10 }}>
        <TouchableOpacity style={styles.button} onPress={() => onLogin()}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    backgroundColor: "dodgerblue",
    marginHorizontal: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});

export default LoginScreen;
