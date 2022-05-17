import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Params } from ".";
import { ChatListItem } from "../../components/Chat/ChatListItem";
import { GradientTop } from "../../components/GradientTop";
import { NewChatButton } from "../../components/NewChatButton";
import { useChatContext } from "../../contexts/ChatContext";

type Props = StackScreenProps<Params, "ChatList">;

const ChatList: React.FC<Props> = ({ navigation }) => {
  const { chats: unorderedChats } = useChatContext();
  const chats = unorderedChats.sort((a, b) => {
    if (a.messages.length <= 0 || b.messages.length <= 0) {
      return 0;
    }
    const timestampA = a.messages[a.messages.length - 1].timestamp;
    const timestampB = b.messages[b.messages.length - 1].timestamp;
    return timestampA > timestampB ? -1 : 1;
  });

  const navigateToChat = (id: string) => {
    navigation.navigate("ChatView", { id });
  };

  return (
    <View style={{ flex: 1 }}>
      <GradientTop>
        <Text style={styles.title}>Messages</Text>
      </GradientTop>
      <View style={styles.listContainer}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ChatListItem key={item.id} chat={item} onPress={navigateToChat} />
          )}
        />
        <NewChatButton
          onPress={() => {
            navigation.navigate("NewChat", {});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default ChatList;
