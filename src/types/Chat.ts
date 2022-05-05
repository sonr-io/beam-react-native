import { User } from "./User";

export type Message = {
  id: string;
  parentId?: string;
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

export type PageMeta = {
  image: string;
  referrer: string;
  title: string;
  url: string;
};
