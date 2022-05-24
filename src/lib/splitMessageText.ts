import { normalizeUrl } from "./normalizeUrl";

export const splitMessageText = (text: string) => {
  return text.split(" ").map((word) => ({ word, url: normalizeUrl(word) }));
};
