import { getChats, getUser } from "../lib/matrix";
import { MatrixClient } from "matrix-js-sdk";
import nameFromMatrixId from "../lib/nameFromMatrixId";
import { StackNavigationProp } from "@react-navigation/stack";

export const completeLogin = async (
  client: MatrixClient,
  navigation: StackNavigationProp<any>
) => {
  const user = await getUser(client.getUserId());
  user.name = nameFromMatrixId(user.id);
  const chats = await getChats();

  chats
    .filter((chat) => !chat.isMember)
    .map((chat) => client.joinRoom(chat.id));

  navigation.replace("Chat", { user, chats });
};
