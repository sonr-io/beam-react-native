export type User = {
  id: string;
  name: string;
  isOnline: boolean;
};

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
  parentSender?: User;
  parentText?: string;
  forwardedFrom?: string;
};

export type ViewableMessage = Message & { last: boolean; showDate: boolean };

export type Chat = {
  id: string;
  lastSeen: number;
  isMember: boolean;
  user: User;
  messages: Message[];
  preview: ChatPreview | null;
};

type ChatPreview = {
  label?: string;
  text: string;
};

export type PageMeta = {
  image: string;
  referrer: string;
  title: string;
  url: string;
};
