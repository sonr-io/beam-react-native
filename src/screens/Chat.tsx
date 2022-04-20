import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

const ids = ["1", "2", "3", "4"];

type Params = {
  List: {};
  View: { id: string };
};

type ChatListProps = StackScreenProps<Params, "List">;

const ChatList = ({ navigation }: ChatListProps) => (
  <View style={styles.listContainer}>
    <Text style={styles.listTitle}>Messages</Text>
    <View style={styles.list}>
      {ids.map((id) => (
        <TouchableOpacity
          key={id}
          style={styles.button}
          onPress={() => navigation.navigate("View", { id })}
        >
          <Text>{id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

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
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#d2d3dd",
    marginBottom: 16,
    borderRadius: 10,
  },
});

export default ChatScreen;
