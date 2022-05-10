import "intl";
import "intl/locale-data/jsonp/en";
import "react-native-gesture-handler";

import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Outfit_400Regular, Outfit_700Bold } from "@expo-google-fonts/outfit";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Thiago } from "./src/_data/users";
import { UserContext } from "./src/contexts/UserContext";
import ChatScreen from "./src/screens/Chat";
import { User } from "./src/types/User";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import NearbyScreen from "./src/screens/Nearby";
// import ProfileScreen from "./src/screens/Profile";

// const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Outfit_400Regular,
    Outfit_700Bold,
    THICCCBOI_Bold: require("./assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOI_Medium: require("./assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOI_Regular: require("./assets/fonts/THICCCBOI-Regular.ttf"),
  });

  const [user, setUser] = useState<User>(Thiago);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SafeAreaProvider>
        <NavigationComponents />
      </SafeAreaProvider>
    </UserContext.Provider>
  );
}

const NavigationComponents = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent
        />
        {/*
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Chat"
        >
          <Tab.Screen name="Nearby" component={NearbyScreen} />
          <Tab.Screen name="Chat" component={ChatListScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        */}
        <ChatScreen />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
