import { Emoji } from "../types/Emoji";

const charFromUtf16 = (utf16: string) => {
  return String.fromCodePoint(
    ...utf16.split("-").map((code) => Number(`0x${code}`))
  );
};

export const charFromEmojiObject = (emoji: Emoji) =>
  charFromUtf16(emoji.unified);
