import { User } from "./User";

export type Message = {
  id: string;
  text: string;
  timestamp: number;
  sender: User;
};

export type ViewableMessage = Message & { last: boolean };

export type Chat = {
  id: string;
  name: string;
  lastSeen: number;
  messages: Message[];
};
