import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Params } from ".";
import { ChatListItem } from "../../components/Chat/ChatListItem";
import { GradientTop } from "../../components/GradientTop";
import { NewChatButton } from "../../components/NewChatButton";
import { useChatContext } from "../../contexts/ChatContext";
import MessageBubbles from "../../icons/MessageBubbles";

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
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <ChatListItem key={item.id} chat={item} onPress={navigateToChat} />
          )}
          ListEmptyComponent={() => <ListEmpty />}
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

const ListEmpty = () => (
  <View style={styles.emptyListContainer}>
    <View style={styles.emptyListContent}>
      <MessageBubbles />
      <Text style={styles.emptyListTitle}>No Messages Yet</Text>
      <Text style={styles.emptyListSubtitle}>
        Messages you send or receive will appear here
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
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
  emptyListContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyListContent: {
    width: 200,
    alignItems: "center",
    marginTop: -80,
  },
  emptyListTitle: {
    fontSize: 20,
    fontFamily: "THICCCBOI_ExtraBold",
    marginVertical: 16,
    textAlign: "center",
    color: "#3A324A",
  },
  emptyListSubtitle: {
    fontSize: 16,
    fontFamily: "THICCCBOI_Regular",
    textAlign: "center",
    color: "#5F596D",
  },
});

export default ChatList;
