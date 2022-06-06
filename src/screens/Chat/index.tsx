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
import {
  ChatContextProvider,
  useChatContext,
} from "../../contexts/ChatContext";
import { StackParams } from "../../../App";
import { getUser, onNewChat, onReceiveMessage } from "../../lib/matrix";
import { client } from "../../matrixClient";

export type Params = {
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
  const { addMessage, addReactionToMessage, setChats } = useChatContext();

  useEffect(() => {
    onReceiveMessage(
      client,
      ({
        messageId: id,
        roomId: chatId,
        message,
        sender,
        parentId,
        forwardedFrom,
      }) => {
        addMessage({
          id,
          chatId,
          message,
          sender: getUser(client, sender),
          parentId,
          forwardedFrom,
        });
      },
      ({ roomId, messageId, sender, emoji }) => {
        addReactionToMessage(roomId, messageId, getUser(client, sender), emoji);
      }
    );
    onNewChat(client, ({ id, name, user }) => {
      setChats((chats) => {
        chats.push({
          id,
          lastSeen: 0,
          messages: [],
          name,
          isMember: false,
          user,
        });
        return [...chats];
      });
    });
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
