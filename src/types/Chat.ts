import { User } from "./User";

export type Reaction = {
  emoji: string;
  user: User;
};

export type Message = {
  id: string;
  text: string;
  timestamp: number;
  sender: User;
  reactions: Reaction[];
  parentId?: string;
  forwardedFrom?: string;
  confirmed: boolean;
};

export type ViewableMessage = Message & { last: boolean; showDate: boolean };

export type Chat = {
  id: string;
  name: string;
  user: User;
  lastSeen: number;
  isMember: boolean;
  messages: Message[];
};

export type PageMeta = {
  image: string;
  referrer: string;
  title: string;
  url: string;
};
