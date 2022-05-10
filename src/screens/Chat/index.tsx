import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import ChatList from "./ChatList";
import ChatView from "./ChatView";
import MessageMenu from "./MessageMenu";
import { Message } from "../../types/Chat";

const Stack = createStackNavigator();

export type Params = {
  ChatList: {};
  ChatNew: {};
  ChatView: { id: string };
  MessageMenu: {
    message: Message;
  };
};

const ChatScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatList" component={ChatList} />
    <Stack.Screen name="ChatView" component={ChatView} />
    <Stack.Screen
      name="MessageMenu"
      component={MessageMenu}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        presentation: "transparentModal",
      }}
    />
  </Stack.Navigator>
);

export default ChatScreen;
