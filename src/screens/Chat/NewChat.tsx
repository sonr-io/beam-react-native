import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const { chats, setChats } = useChatContext();

  const navigateToChat = (id: string) => {
    navigation.goBack();
    navigation.navigate("ChatView", { id });
  };

  const onPressGo = (value: string) => {
    const snrId = `${value}.snr`;

    if (snrId === "mark.snr") {
      throw new Error();
    }

    const chat = chats.find((chat) => chat.name === snrId);

    if (chat) {
      navigateToChat(chat.id);
    } else {
      const chatId = `${chats.length + 1}`;
      chats.push({
        id: chatId,
        lastSeen: 0,
        messages: [],
        name: snrId,
        user: {
          id: snrId,
          isOnline: false,
          name: value,
        },
      });
      setChats(chats);
      navigateToChat(chatId);
    }
  };

  const onUserSelected = (user: User) => {
    const chat = chats.find((chat) => chat.name === user.id);
    if (chat) {
      navigateToChat(chat.id);
    }
  };

  return (
    <TransparentModal
      title="New Message"
      onClose={() => {
        navigation.goBack();
      }}
    >
      <UserSelector onPressGo={onPressGo} onUserSelected={onUserSelected} />
    </TransparentModal>
  );
};

export default NewChat;
