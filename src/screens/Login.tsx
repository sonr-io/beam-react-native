import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { StackParams } from "../../App";
import { useMatrixClientContext } from "../contexts/MatrixClientContext";
import { login } from "../lib/matrix";

type Props = StackScreenProps<StackParams, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setClient } = useMatrixClientContext();
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLogin = async () => {
    const client = await login(user, password);
    setClient(client);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        onChangeText={(text) => {
          setUser(text);
        }}
      />
      <TextInput
        secureTextEntry
        placeholder="password"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button title="login" onPress={onLogin} />
      <Button
        title="skip"
        onPress={() => {
          navigation.push("Chat", {});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
