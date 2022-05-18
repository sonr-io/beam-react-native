import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation, route }) => {
  const { from, text } = route.params;
  const { chats, addMessage } = useChatContext();
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

  const forwardMessage = (to: string, text: string, from: string) => {
    const chat = chats.find((chat) => chat.name === to);
    if (chat) {
      addMessage({
        chatId: chat.id,
        message: text,
        forwardedFrom: from,
      });
      return chat.id;
    }
  };

  const onSend = () => {
    if (markedUsers.size === 1) {
      const { value: id } = markedUsers.values().next();
      const chatId = forwardMessage(id, text, from) ?? "";
      navigation.navigate("ChatView", { id: chatId });
    } else {
      for (const id of markedUsers.values()) {
        forwardMessage(id, text, from);
      }
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
