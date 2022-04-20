import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { chats } from '../_data/chats';
import { timeAgo } from '../lib/timeAgo';
import { Chat } from '../types/Chat';

const Stack = createStackNavigator();

type Params = {
  List: {};
  View: { id: string };
};

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => (
  <View style={styles.listContainer}>
    <Text style={styles.listTitle}>Messages</Text>
    <View style={styles.list}>
      {chats.map((chat: Chat) => {
        const { id, name, lastSeen, messages } = chat;
        
        const lastMessage = messages.at(-1);
        
        if (!lastMessage) {
          return <></>
        }
        
        const elapsedTime = timeAgo(lastMessage.timestamp);

        const hasUnreadMessage = lastSeen < lastMessage.timestamp

        return (
          <TouchableOpacity
            key={id}
            style={styles.button}
            onPress={() => navigation.navigate("View", { id })}
          >
            <View style={styles.buttonContainer}>
              {hasUnreadMessage && (<View style={styles.unRead}></View>)}
              <Image
                source={require("../../assets/avatar.jpg")}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.messageName}>{name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {lastMessage?.text}
                </Text>
              </View>
              <Text style={styles.messageTime}>{elapsedTime}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

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
  unRead: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#1792FF',
    position: 'absolute',
    zIndex: 100,
    left: 0,
    top: 0
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  listTitle: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    alignItems: "stretch",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 12,
  },
  messageName: {
    fontSize: 15,
    lineHeight: 24,
  },
  lastMessage: {
    fontSize: 12,
    lineHeight: 20,
    color: "#636366",
  },
  messageTime: {
    fontSize: 11,
    alignSelf: "flex-start",
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#d2d3dd",
    marginBottom: 16,
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
