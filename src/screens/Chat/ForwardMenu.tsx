import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";
import { client } from "../../matrixClient";

import { User } from "../../types/Chat";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation, route }) => {
  const { from, text } = route.params;
  const { chats } = useChatContext();
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

  const forwardMessage = (chatId: string, text: string, from: string) => {
    client.sendMessage(chatId, {
      msgtype: "m.text",
      body: text,
      forwardedFrom: from,
    });
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
