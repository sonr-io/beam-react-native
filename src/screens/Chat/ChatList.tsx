import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Params } from ".";
import { ChatListItem } from "../../components/Chat/ChatListItem";
import { GradientTop } from "../../components/GradientTop";
import { NewChatButton } from "../../components/NewChatButton";
import { useChatContext } from "../../contexts/ChatContext";
import IconMessageBubbles from "../../icons/MessageBubbles";
import IconLogout from "../../icons/Logout";
import { logout } from "../../lib/matrix";

type Props = StackScreenProps<Params, "ChatList">;
const ChatList: React.FC<Props> = ({ navigation }) => {
  const { chats: unorderedChats, updateLastOpen } = useChatContext();
  const chats = unorderedChats
    .filter((chat) => chat.messages.length > 0)
    .sort((a, b) => {
      const timestampA = a.messages[a.messages.length - 1].timestamp;
      const timestampB = b.messages[b.messages.length - 1].timestamp;
      return timestampA > timestampB ? -1 : 1;
    });

  const navigateToChat = (id: string) => {
    navigation.navigate("ChatView", { id });
    updateLastOpen(id);
  };

  const onLogout = async () => {
    await logout();
    await AsyncStorage.multiRemove(["sessionUser", "sessionToken"]);
    navigation.replace("Splash", {});
  };

  return (
    <View style={{ flex: 1 }}>
      <GradientTop>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <IconLogout />
          </TouchableOpacity>
        </View>
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
      <IconMessageBubbles />
      <Text style={styles.emptyListTitle}>No Messages Yet</Text>
      <Text style={styles.emptyListSubtitle}>
        Messages you send or receive will appear here
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 34,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#FFFFFF",
    paddingHorizontal: 15,
    marginTop: 4,
    marginBottom: 12,
  },
  logoutButton: {
    padding: 15,
    flex: 1,
    flexDirection: "row",
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
