import React, {useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Button, FAB } from 'react-native-elements';

const Stack = createStackNavigator();

const chats = [
  {
    id: "1",
    name: "Matheus Bittencourt",
    lastMessage: "Hey!",
  },
  {
    id: "2",
    name: "Thiago Fassina",
    lastMessage: "Long message the should be abbreviated with dots at the end",
  },
];

type Params = {
  List: {};
  View: { id: string };
  NewChat: {};
};

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => (
  <View style={styles.listContainer}>
    <Text style={styles.listTitle}>Messages</Text>
    <View style={styles.list}>
      {chats.map(({ id, name, lastMessage }) => (
        <TouchableOpacity
          key={id}
          style={styles.button}
          onPress={() => navigation.navigate("View", { id })}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={require("../../assets/avatar.jpg")}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.messageName}>{name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {lastMessage}
              </Text>
            </View>
            <Text style={styles.messageTime}>12 : 00 PM</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    <FAB
      icon={{name: 'add', color: 'white' }}
      placement="right"
      color="dodgerblue"
      onPress={() => navigation.navigate("NewChat", {})}
    />
  </View>
);

const NewChat = ({ navigation }: ChatListProps) => {
  const [sName, setSName] = useState('');
  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.input}
        autoFocus={true}
        onChangeText={(text) => setSName(text)}
      />
      <Button
        title="Start chat"
        onPress={() => navigation.navigate("View", { id: sName })}
      />
    </View>
  )
};

type ChatViewProps = StackScreenProps<Params, "View">;

const ChatView = ({ route }: ChatViewProps) => (
  <View style={styles.container}>
    <Text>{route.params.id}</Text>
  </View>
);

const ChatScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="List"
      component={ChatList}
      options={{ headerShown: false, title: "Messages" }}
    />
    <Stack.Screen name="View" component={ChatView} options={{ title: "" }} />
    <Stack.Screen name="NewChat" component={NewChat} options={{ title: "" }} />
  </Stack.Navigator>
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
  input: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default ChatScreen;
