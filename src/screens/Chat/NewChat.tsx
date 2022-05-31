import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";

import { Params } from ".";
import { StartNewChat } from "../../components/StartNewChat";

import TransparentModal from "../../components/TransparentModal";
import { UserList } from "../../components/UserList";
import UserSelector from "../../components/UserSelector";

import { useChatContext } from "../../contexts/ChatContext";

import { User } from "../../types/User";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const { chats, setChats } = useChatContext();
  const users = chats.map((chat) => chat.user);

  const navigateToChat = (id: string) => {
    navigation.goBack();
    navigation.navigate("ChatView", { id });
  };

  const startNew = (value: string) => {
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

  const goToExisting = (user: User) => {
    const chat = chats.find((chat) => chat.name === user.id);
    if (chat) {
      navigateToChat(chat.id);
    }
  };

  return (
    <TransparentModal
      title="New Conversation"
      onClose={() => navigation.goBack()}
    >
      <StartNewChat onPress={startNew} />

      <View style={{ marginBottom: 24 }} />

      <UserList
        sections={[{ title: "Recent", data: users }]}
        onPress={goToExisting}
      />
    </TransparentModal>
  );
};

export default NewChat;
