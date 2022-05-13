import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation, route }) => {
  const { chats } = useChatContext();

  const onUserSelected = (user: User) => {
    const chat = chats.find((chat) => chat.name === user.id);
    if (chat) {
      navigation.navigate("ChatView", { id: chat.id, forward: route.params });
    }
  };

  return (
    <TransparentModal
      title="Forward"
      onClose={() => {
        navigation.goBack();
      }}
    >
      <UserSelector onPressGo={() => {}} onUserSelected={onUserSelected} />
    </TransparentModal>
  );
};

export default ForwardMenu;
