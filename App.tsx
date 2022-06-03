import "allsettled-polyfill";
import "intl";
import "intl/locale-data/jsonp/en";
import "./intl-collator";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { MatrixClient } from "matrix-js-sdk";
import React, { useEffect, useState } from "react";
import { LogBox, StatusBar, StyleSheet, View } from "react-native";

import { ChatContextProvider } from "./src/contexts/ChatContext";
import { EmojiHistoryContextProvider } from "./src/contexts/EmojiHistoryContext";
import { MatrixClientContext } from "./src/contexts/MatrixClientContext";
import { UserContext } from "./src/contexts/UserContext";
import ChatScreen from "./src/screens/Chat";
import LoginScreen from "./src/screens/Login";
import { User } from "./src/types/User";

const Stack = createStackNavigator();

export type StackParams = {
  Login: {};
  Chat: {};
};

export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
  ]);

  const [fontsLoaded] = useFonts({
    THICCCBOI_ExtraBold: require("./assets/fonts/THICCCBOI-ExtraBold.ttf"),
    THICCCBOI_Bold: require("./assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOI_Medium: require("./assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOI_Regular: require("./assets/fonts/THICCCBOI-Regular.ttf"),
  });

  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<MatrixClient | null>(null);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <UserContext.Provider value={{ user, setUser }}>
        <MatrixClientContext.Provider value={{ client, setClient }}>
          <EmojiHistoryContextProvider>
            <ChatContextProvider>
              <NavigationContainer>
                <StatusBar
                  barStyle="light-content"
                  backgroundColor={"transparent"}
                  translucent
                />

                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </ChatContextProvider>
          </EmojiHistoryContextProvider>
        </MatrixClientContext.Provider>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
