import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";
import { useMatrixClientContext } from "../../contexts/MatrixClientContext";
import { useUserContext } from "../../contexts/UserContext";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation, route }) => {
  const { from, text } = route.params;
  const { chats, addMessage } = useChatContext();
  const { user } = useUserContext();
  const { client } = useMatrixClientContext();
  const [markedUsers, setMarkedUsers] = React.useState(new Set<string>());

  if (!user || !client) {
    return <></>;
  }

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

  const forwardMessage = async (to: string, text: string, from: string) => {
    const chat = chats.find((chat) => chat.user.id === to);
    if (chat) {
      await client.sendMessage(chat.id, {
        msgtype: "m.forward",
        body: text,
        forwardedFrom: from,
      });
      addMessage({
        chatId: chat.id,
        message: text,
        forwardedFrom: from,
        sender: user,
      });
      return chat.id;
    }
  };

  const onSend = async () => {
    if (markedUsers.size === 1) {
      const { value: id } = markedUsers.values().next();
      const chatId = (await forwardMessage(id, text, from)) ?? "";
      navigation.navigate("ChatView", { id: chatId });
    } else {
      await Promise.all(
        [...markedUsers.values()].map((id) => forwardMessage(id, text, from))
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
