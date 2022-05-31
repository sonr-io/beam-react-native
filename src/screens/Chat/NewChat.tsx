import { StackScreenProps } from "@react-navigation/stack";
import { Preset } from "matrix-js-sdk/lib/@types/partials";
import React from "react";
import { View } from "react-native";

import { Params } from ".";
import { StartNewChat } from "../../components/StartNewChat";
import TransparentModal from "../../components/TransparentModal";
import { UserList } from "../../components/UserList";
import { useChatContext } from "../../contexts/ChatContext";
import { useMatrixClientContext } from "../../contexts/MatrixClientContext";
import { User } from "../../types/User";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const { chats, setChats } = useChatContext();
  const { client } = useMatrixClientContext();
  const users = chats.map((chat) => chat.user);

  const navigateToChat = (id: string) => {
    navigation.goBack();
    navigation.navigate("ChatView", { id });
  };

  const startNew = async (id: string) => {
    const fullId = `@${id}:matrix.sonr.network`;

    if (fullId === client?.getUserId()) {
      return;
    }

    const existingChat = chats.find((chat) => chat.user.id === fullId);
    if (existingChat) {
      navigateToChat(existingChat.id);
      return;
    }

    const response = await client?.createRoom({
      invite: [fullId],
      preset: Preset.PrivateChat,
    });
    if (!response) return;

    // if id does not exist

    chats.push({
      id: response.room_id,
      lastSeen: 0,
      messages: [],
      name: id,
      isMember: true,
      user: {
        id: id,
        name: id,
        isOnline: false,
      },
    });
    setChats([...chats]);
    navigateToChat(response.room_id);
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
