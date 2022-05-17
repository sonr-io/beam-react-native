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

  const onSend = () => {
    for (const id of markedUsers.values()) {
      const chat = chats.find((chat) => chat.name === id);
      if (chat) {
        addMessage({ chatId: chat?.id, message: text, forwardedFrom: from });
      }
    }
    navigation.navigate("ChatList", {});
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
        onSend={onSend}
      />
    </TransparentModal>
  );
};

export default ForwardMenu;
