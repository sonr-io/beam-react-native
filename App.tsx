import "allsettled-polyfill";
import "intl";
import "intl/locale-data/jsonp/en";
import "./intl-collator";
import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox, StatusBar, View } from "react-native";
import { useFonts } from "expo-font";

import ChatScreen from "./src/screens/Chat";
import LoginScreen from "./src/screens/Login";
import SplashScreen from "./src/screens/Splash";
import { Chat, User } from "./src/types/Chat";

const Stack = createStackNavigator();

export type StackParams = {
  Login: {};
  Chat: {
    user: User;
    chats: Chat[];
  };
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

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent
        />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
