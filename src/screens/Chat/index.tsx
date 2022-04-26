import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatList from "./ChatList";
import ChatView from "./ChatView";

const Stack = createStackNavigator();

export type Params = {
  List: {};
  View: { id: string };
};

const ChatScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={ChatList} />
    <Stack.Screen name="View" component={ChatView} />
  </Stack.Navigator>
);

export default ChatScreen;
