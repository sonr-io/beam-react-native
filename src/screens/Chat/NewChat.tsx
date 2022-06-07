import { StackScreenProps } from "@react-navigation/stack";
import { Preset } from "matrix-js-sdk/lib/@types/partials";
import React from "react";
import { View } from "react-native";

import { Params } from ".";
import { StartNewChat } from "../../components/StartNewChat";
import TransparentModal from "../../components/TransparentModal";
import { UserList } from "../../components/UserList";
import { useChatContext } from "../../contexts/ChatContext";
import { useMessageListeners } from "../../lib/matrixHooks";
import { client } from "../../matrixClient";
import { User } from "../../types/User";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const { chats, setChats } = useChatContext();
  const { addMessageListeners } = useMessageListeners();
  const users = chats.map((chat) => chat.user);
  const [error, setError] = React.useState(false);

  const navigateToChat = (id: string) => {
    navigation.goBack();
    navigation.navigate("ChatView", { id });
  };

  const startNew = async (id: string) => {
    const fullId = `@${id}:matrix.sonr.network`;

    if (fullId === client.getUserId()) {
      setError(true);
      return;
    }

    const existingChat = chats.find((chat) => chat.user.id === fullId);
    if (existingChat) {
      navigateToChat(existingChat.id);
      return;
    }

    try {
      await client.getProfileInfo(fullId);
    } catch {
      setError(true);
      return;
    }

    const response = await client.createRoom({
      invite: [fullId],
      preset: Preset.PrivateChat,
    });
    if (!response) return;

    addMessageListeners(response.room_id);

    chats.push({
      id: response.room_id,
      lastSeen: 0,
      messages: [],
      name: id,
      isMember: true,
      user: {
        id: fullId,
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
      <StartNewChat
        onPress={startNew}
        onChangeText={() => setError(false)}
        hasError={error}
      />

      <View style={{ marginBottom: 24 }} />

      <UserList
        sections={[{ title: "Recent", data: users }]}
        onPress={goToExisting}
      />
    </TransparentModal>
  );
};

export default NewChat;
