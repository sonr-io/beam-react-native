import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Params } from ".";
import { chats } from "../../_data/chats";
import { ChatListItem } from "../../components/Chat/ChatListItem";
import { NewChatButton } from "../../components/NewChatButton";
import { GradientHeader } from "../../components/GradientHeader";

type Props = StackScreenProps<Params, "ChatList">;

const ChatList: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const navigateToChat = (id: string) => {
    navigation.navigate("ChatView", { id });
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.listContainer}>
      <GradientHeader text="Messages" />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatListItem
            key={item.id}
            chat={item}
            navitgateToChat={navigateToChat}
          />
        )}
      />
      <NewChatButton onPress={() => navigation.navigate("ChatNew", {})} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  list: {
    alignItems: "stretch",
  },
});

export default ChatList;
