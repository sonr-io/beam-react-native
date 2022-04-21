import "react-native-gesture-handler";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ChatListScreen } from "./src/screens/ChatList";
// import NearbyScreen from "./src/screens/Nearby";
// import ProfileScreen from "./src/screens/Profile";

// const Tab = createBottomTabNavigator();

export default function App() {
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
          <ChatListScreen />
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
