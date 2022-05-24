import { normalizeUrl } from "./normalizeUrl";

export const splitMessageText = (text: string) => {
  const regexp = /(([^  \n,\(\))]+)([ \n,\(\)]*))+?/g;
  const matches = [...text.matchAll(regexp)];
  return matches.map((group) => ({
    word: group[2],
    separator: group[3],
    url: normalizeUrl(group[2]),
  }));
};
