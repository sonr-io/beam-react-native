import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Params } from ".";
import { chats } from "../../_data/chats";
import { ChatListItem } from "../../components/Chat/ChatListItem";
import { GradientTop } from "../../components/GradientTop";
import { NewChatButton } from "../../components/NewChatButton";
import { ChatNewModal } from "./ChatNewModal";

type Props = StackScreenProps<Params, "ChatList">;

const ChatList: React.FC<Props> = ({ navigation }) => {
  const [newChatVisible, setNewChatVisible] = useState(false);

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
        <NewChatButton onPress={() => setNewChatVisible(true)} />
        <ChatNewModal
          visible={newChatVisible}
          onClose={() => setNewChatVisible(false)}
          navigateToChat={(id) => navigation.navigate("ChatView", { id })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 44,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default ChatList;
