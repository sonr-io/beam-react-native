import { useChatContext } from "../contexts/ChatContext";
import { client } from "../matrixClient";
import {
  OnMessageCallback,
  getUser,
  OnReactionCallback,
  onReceiveMessage,
} from "./matrix";

export const useMessageListeners = () => {
  const { addMessage, addReactionToMessage } = useChatContext();

  const onMessage: OnMessageCallback = ({
    messageId: id,
    roomId: chatId,
    message,
    sender,
    parentId,
    forwardedFrom,
  }) => {
    addMessage({
      id,
      chatId,
      message,
      sender: getUser(client, sender),
      parentId,
      forwardedFrom,
    });
  };

  const onReaction: OnReactionCallback = ({
    roomId,
    messageId,
    sender,
    emoji,
  }) => {
    addReactionToMessage(roomId, messageId, getUser(client, sender), emoji);
  };

  const addMessageListeners = (roomId?: string) => {
    onReceiveMessage(onMessage, onReaction, roomId);
  };

  return { addMessageListeners };
};
