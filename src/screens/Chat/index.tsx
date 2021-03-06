import React, { useEffect } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import ChatList from "./ChatList";
import ChatView from "./ChatView";
import ForwardMenu from "./ForwardMenu";
import MessageMenu from "./MessageMenu";
import NewChat from "./NewChat";

import { Message } from "../../types/Chat";
import { UserContextProvider } from "../../contexts/UserContext";
import { EmojiHistoryContextProvider } from "../../contexts/EmojiHistoryContext";
import { ChatContextProvider } from "../../contexts/ChatContext";
import { StackParams } from "../../../App";
import { useListeners } from "../../lib/matrixHooks";

export type Params = {
  Login: {};
  ChatList: {};
  NewChat: {};
  ChatView: { id: string };
  MessageMenu: {
    chatId: string;
    message: Message;
  };
  ForwardMenu: {
    text: string;
    from: string;
  };
};

const ChatSection = () => {
  const { addListeners, removeListeners } = useListeners();

  useEffect(() => {
    addListeners();
    return removeListeners;
  }, []);

  const Stack = createStackNavigator();
  return (
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
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="ForwardMenu"
        component={ForwardMenu}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          presentation: "transparentModal",
        }}
      />
    </Stack.Navigator>
  );
};

type Props = StackScreenProps<StackParams, "Chat">;
const ChatScreen: React.FC<Props> = ({ route }) => {
  return (
    <UserContextProvider user={route.params.user}>
      <EmojiHistoryContextProvider>
        <ChatContextProvider chats={route.params.chats}>
          <ChatSection />
        </ChatContextProvider>
      </EmojiHistoryContextProvider>
    </UserContextProvider>
  );
};

export default ChatScreen;
