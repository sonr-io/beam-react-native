import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERS } from "@env";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import MotorKit from "../lib/motorModule";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackParams } from "../../App";
import { getChats, getUser, login, loginWithSession } from "../lib/matrix";
import nameFromMatrixId from "../lib/nameFromMatrixId";
import { MatrixClient } from "matrix-js-sdk";
import request from "xmlhttp-request";

interface PresetUser {
  username: string;
  password: string;
}

type Props = StackScreenProps<StackParams, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const presetUsers: PresetUser[] = JSON.parse(USERS || "[]");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();

  const loadSession = async () => {
    const sessionUser = await AsyncStorage.getItem("sessionUser");
    const sessionToken = await AsyncStorage.getItem("sessionToken");

    if (!sessionUser || !sessionToken) {
      setShowForm(true);
      return;
    }

    const client = await loginWithSession(sessionUser, sessionToken);
    await completeLogin(client);
  };

  const onRegister = async () => {
    // Try-catch to avoid crashing the app if the user doesn't have a network connection
    try {
      const request = MotorKit.newWallet();
      console.log(request);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  const onLogin = async (username: string, password: string) => {
    setError(false);
    setLoading(true);

    const client = await login(username, password);
    if (!client) {
      setError(true);
      setLoading(false);
      return;
    }

    AsyncStorage.setItem("sessionUser", client.getUserId());
    AsyncStorage.setItem("sessionToken", client.getAccessToken());

    completeLogin(client);
  };

  const completeLogin = async (client: MatrixClient) => {
    const user = await getUser(client.getUserId());
    user.name = nameFromMatrixId(user.id);
    const chats = await getChats();

    chats
      .filter((chat) => !chat.isMember)
      .map((chat) => client.joinRoom(chat.id));

    navigation.replace("Chat", { user, chats });
    setLoading(false);
    setShowForm(true);
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
      {!showForm && (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        </View>
      )}

      {showForm && (
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

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                onRegister();
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.presetContainer}>
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

            {Platform.OS === "ios" && (
              <KeyboardSpacer topSpacing={-insets.bottom} />
            )}
          </View>

          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
  },
  presetUser: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    marginRight: 10,
    marginBottom: 10,
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
