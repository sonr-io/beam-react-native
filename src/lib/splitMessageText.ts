import { normalizeUrl } from "./normalizeUrl";
import matchAll from "string.prototype.matchall";

export const splitMessageText = (text: string) => {
  const regexp = /(([^  \n,\(\))]+)([ \n,\(\)]*))+?/g;
  const matches = [...matchAll(text, regexp)];
  return matches.map((group) => ({
    word: group[2],
    separator: group[3],
    url: normalizeUrl(group[2]),
  }));
};
