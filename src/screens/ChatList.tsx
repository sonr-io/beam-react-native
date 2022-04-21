import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

import { chats } from "../_data/chats";
import { ChatListItem } from "../components/Chat/ChatListItem";
import { GradientHeader } from "../components/GradientHeader";
import { Chat } from "../types/Chat";

const Stack = createStackNavigator();

type Params = {
  List: {};
  View: { id: string };
};

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const navitgateToChat = (id: string) => {
    navigation.navigate("View", { id });
  };

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets?.top, ...styles.listContainer }}>
          <GradientHeader text="Messages"></GradientHeader>
          <View style={styles.list}>
            {chats.map((chat: Chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                navitgateToChat={navitgateToChat}
              />
            ))}
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

type ChatViewProps = StackScreenProps<Params, "View">;

const ChatView = ({ route }: ChatViewProps) => (
  <View style={styles.container}>
    <Text>{route.params.id}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  list: {
    alignItems: "stretch",
  },
});

export const ChatListScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="List"
      component={ChatList}
      options={{ headerShown: false, title: "Messages" }}
    />
    <Stack.Screen name="View" component={ChatView} options={{ title: "" }} />
  </Stack.Navigator>
);
