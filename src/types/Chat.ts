import { User } from "./User";

export type Message = {
  text: string;
  timestamp: number;
  sender: User;
};

export type Chat = {
  id: string;
  name: string;
  lastSeen: number;
  messages: Message[];
};
