export type Emoji = {
  name: string;
  unified: string;
  category: string;
  subcategory: string;
  sort_order: number;
};

export type EmojiCategory =
  | "History"
  | "Smileys & People"
  | "Animals & Nature"
  | "Food & Drink"
  | "Activities"
  | "Travel & Places"
  | "Objects"
  | "Symbols"
  | "Flags";
