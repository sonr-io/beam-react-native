import { Chat } from "../types/Chat";
import { Daniel, Matheus, Thiago } from "./users";

export const chats: Chat[] = [
  {
    id: "1",
    name: Matheus.id,
    lastSeen: 1650487185019,
    messages: [
      { text: "Welcome", sender: Thiago, timestamp: 1650487006982 },
      {
        text: "Would you rather be an apple or an orange?",
        sender: Matheus,
        timestamp: 1650487006983,
      },
      {
        text: "Why are you here today?",
        sender: Thiago,
        timestamp: 1650487006984,
      },
      {
        text: " look inside and find",
        sender: Matheus,
        timestamp: 1650487006985,
      },
      {
        text: "Would you like to see into the future? Why?",
        sender: Thiago,
        timestamp: 1650487006986,
      },
      {
        text: "I like work; it fascinates me. I can sit and look at it for hours.",
        sender: Matheus,
        timestamp: 1650487006987,
      },
      {
        text: "I see you find yourself very interesting",
        sender: Thiago,
        timestamp: 1650487006988,
      },
      { text: "meaning?", sender: Matheus, timestamp: 1650487006989 },
      { text: "really?", sender: Thiago, timestamp: 1650487006990 },
      { text: "help me", sender: Matheus, timestamp: 1650487006991 },
      { text: "how may I guide you", sender: Thiago, timestamp: 1650487006991 },
      {
        text: "because one is beer with clamato and the other is like a smoothie",
        sender: Matheus,
        timestamp: 1650487006993,
      },
    ],
  },
  {
    id: "2",
    name: Daniel.id,
    lastSeen: 1650487185019,
    messages: [
      {
        text: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
        sender: Daniel,
        timestamp: 1650487185010,
      },
      {
        text: "Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
        sender: Thiago,
        timestamp: 1650487185011,
      },
      {
        text: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
        sender: Daniel,
        timestamp: 1650487185012,
      },
    ],
  },
];
