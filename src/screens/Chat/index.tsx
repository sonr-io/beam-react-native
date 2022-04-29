import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import ChatList from "./ChatList";
import ChatNew from "./ChatNew";
import ChatView from "./ChatView";
import MessageMenu from "./MessageMenu";

const Stack = createStackNavigator();

export type Params = {
  List: {};
  New: {};
  View: { id: string };
  MessageMenu: {};
};

const ChatScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={ChatList} />
    <Stack.Screen
      name="New"
      component={ChatNew}
      options={{
        title: "Profile",
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    />
    <Stack.Screen name="View" component={ChatView} />
    <Stack.Screen
      name="MessageMenu"
      component={MessageMenu}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    />
  </Stack.Navigator>
);

export default ChatScreen;
