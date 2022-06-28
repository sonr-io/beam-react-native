import { StackScreenProps } from "@react-navigation/stack";
import { Preset } from "matrix-js-sdk/lib/@types/partials";
import React from "react";
import { View } from "react-native";

import { Params } from ".";
import { StartNewChat } from "../../components/StartNewChat";
import TransparentModal from "../../components/TransparentModal";
import { UserList } from "../../components/UserList";
import { useChatContext } from "../../contexts/ChatContext";
import { useListeners } from "../../lib/matrixHooks";
import { getClient } from "../../matrixClient";
import { User } from "../../types/Chat";

type Props = StackScreenProps<Params, "NewChat">;

const NewChat: React.FC<Props> = ({ navigation }) => {
  const { chats, setChats } = useChatContext();
  const { addRoomListeners } = useListeners();
  const users = chats
    .filter((chat) => chat.messages.length > 0)
    .map((chat) => chat.user);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigateToChat = (id: string) => {
    navigation.goBack();
    navigation.navigate("ChatView", { id });
  };

  const startNew = async (id: string) => {
    setLoading(true);
    setError(false);
    const fullId = `@${id}:matrix.sonr.network`;
    const client = getClient();

    if (fullId === client.getUserId()) {
      setLoading(false);
      setError(true);
      return;
    }

    const existingChat = chats.find((chat) => chat.user.id === fullId);
    if (existingChat) {
      navigateToChat(existingChat.id);
      return;
    }

    const profile = await client.getProfileInfo(fullId).catch(() => {
      setLoading(false);
      setError(true);
    });
    if (!profile) return;

    const response = await client.createRoom({
      invite: [fullId],
      preset: Preset.PrivateChat,
    });
    if (!response) return;

    addRoomListeners(response.room_id);

    chats.push({
      id: response.room_id,
      lastOpen: 0,
      messages: [],
      preview: null,
      lastActivity: Date.now(),
      isMember: true,
      user: {
        id: fullId,
        name: id,
      },
    });
    setChats([...chats]);
    navigateToChat(response.room_id);
  };

  const goToExisting = (user: User) => {
    const chat = chats.find((chat) => chat.user.id === user.id);
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
        isLoading={loading}
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
