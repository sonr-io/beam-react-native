import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import ChatList from "./ChatList";
import ChatNew from "./ChatNew";
import ChatView from "./ChatView";

const Stack = createStackNavigator();

export type Params = {
  List: {};
  New: {};
  View: { id: string };
};

const ChatScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="List"
      component={ChatList}
    />
    <Stack.Screen
      name="New"
      component={ChatNew}
      options={{
        title: 'Profile',
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    />
    <Stack.Screen
      name="View"
      component={ChatView}
    />
  </Stack.Navigator>
);

export default ChatScreen;
