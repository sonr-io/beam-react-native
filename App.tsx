import "react-native-gesture-handler";

import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Outfit_400Regular, Outfit_700Bold } from "@expo-google-fonts/outfit";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ChatScreen from "./src/screens/Chat";

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
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
