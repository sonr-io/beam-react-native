import { Chat } from "../types/Chat";
import { Daniel, Dylan, Matheus, Thiago } from "./users";

export const chats: Chat[] = [
  {
    id: "1",
    name: Matheus.id,
    lastSeen: 1650487006093,
    messages: [
      { id: "1", text: "Welcome", sender: Thiago, timestamp: 1650487006982 },
      {
        id: "2",
        text: "Would you rather be an apple or an orange?",
        sender: Matheus,
        timestamp: 1650487006983,
      },
      {
        id: "3",
        text: "Why are you here today?",
        sender: Thiago,
        timestamp: 1650487006984,
      },
      {
        id: "4",
        text: " look inside and find",
        sender: Matheus,
        timestamp: 1650487006985,
      },
      {
        id: "5",
        text: "Would you like to see into the future? Why?",
        sender: Thiago,
        timestamp: 1650487006986,
      },
      {
        id: "6",
        text: "I like work; it fascinates me. I can sit and look at it for hours.",
        sender: Matheus,
        timestamp: 1650487006987,
      },
      {
        id: "7",
        text: "I see you find yourself very interesting",
        sender: Thiago,
        timestamp: 1650487006988,
      },
      { id: "8", text: "meaning?", sender: Matheus, timestamp: 1650487006989 },
      { id: "9", text: "really?", sender: Thiago, timestamp: 1650487006990 },
      { id: "10", text: "help me", sender: Matheus, timestamp: 1650487006991 },
      {
        id: "11",
        text: "how may I guide you",
        sender: Thiago,
        timestamp: 1650487006991,
      },
      {
        id: "12",
        text: "because one is beer with clamato and the other is like a smoothie",
        sender: Matheus,
        timestamp: 1650487006993,
      },
    ],
  },
  {
    id: "2",
    name: Daniel.id,
    lastSeen: 1650331578014,
    messages: [
      {
        id: "13",
        text: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
        sender: Daniel,
        timestamp: 1650331578011,
      },
      {
        id: "14",
        text: "Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
        sender: Thiago,
        timestamp: 1650331578012,
      },
      {
        id: "15",
        text: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
        sender: Daniel,
        timestamp: 1650331578013,
      },
    ],
  },
  {
    id: "3",
    name: Dylan.id,
    lastSeen: 1650331578100,
    messages: [
      {
        id: "14",
        text: "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!",
        sender: Dylan,
        timestamp: 1650331578101,
      },
      {
        id: "15",
        text: "Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
        sender: Thiago,
        timestamp: 1650331578102,
      },
      {
        id: "16",
        text: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
        sender: Dylan,
        timestamp: 1650331578103,
      },
      {
        id: "18",
        text: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
        sender: Dylan,
        timestamp: 1650331578104,
      },
      {
        id: "19",
        text: "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)",
        sender: Dylan,
        timestamp: 1650331578104,
      },
      {
        id: "20",
        text: "hey",
        sender: Thiago,
        timestamp: 1650331578105,
      },
      {
        id: "21",
        text: "hey",
        sender: Thiago,
        timestamp: 1650331578106,
      },
      {
        id: "22",
        text: "hey",
        sender: Thiago,
        timestamp: 1650331578107,
      },
    ],
  },
];
