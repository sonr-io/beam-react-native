import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import uuid from "react-native-uuid";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";
import { client } from "../../matrixClient";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation, route }) => {
  const { from, text } = route.params;
  const { chats, addMessage, setMessageId } = useChatContext();
  const { user } = useUserContext();
  const [markedUsers, setMarkedUsers] = React.useState(new Set<string>());

  const onUserSelected = (user: User) => {
    if (markedUsers.has(user.id)) {
      markedUsers.delete(user.id);
    } else {
      markedUsers.add(user.id);
    }
    setMarkedUsers(new Set(markedUsers));
  };

  const onUnmarkUser = (id: string) => {
    markedUsers.delete(id);
    setMarkedUsers(new Set(markedUsers));
  };

  const forwardMessage = async (chatId: string, text: string, from: string) => {
    const tempId = uuid.v4() as string;
    addMessage({
      id: null,
      tempId,
      chatId: chatId,
      message: text,
      forwardedFrom: from,
      sender: user,
    });
    const { event_id: id } = await client.sendMessage(chatId, {
      msgtype: "m.text",
      body: text,
      forwardedFrom: from,
    });
    setMessageId(chatId, tempId, id);
  };

  const onSend = async () => {
    if (markedUsers.size === 1) {
      const { value: userId } = markedUsers.values().next();
      const chat = chats.find((chat) => chat.user.id === userId)!;
      forwardMessage(chat.id, text, from);
      navigation.navigate("ChatView", { id: chat.id });
    } else {
      Promise.all(
        [...markedUsers.values()]
          .map((userId) => chats.find((chat) => chat.user.id === userId)!)
          .map((chat) => forwardMessage(chat.id, text, from))
      );
      navigation.navigate("ChatList", {});
    }
  };

  return (
    <TransparentModal
      title="Forward"
      onClose={() => {
        navigation.goBack();
      }}
    >
      <UserSelector
        onUserSelected={onUserSelected}
        markedUsers={markedUsers}
        onUnmarkUser={onUnmarkUser}
        onSend={onSend}
      />
    </TransparentModal>
  );
};

export default ForwardMenu;
