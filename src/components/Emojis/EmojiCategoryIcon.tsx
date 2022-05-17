import React from "react";

import EmojiCategoryActivities from "../../icons/EmojiCategoryActivities";
import EmojiCategoryAnimals from "../../icons/EmojiCategoryAnimals";
import EmojiCategoryFlags from "../../icons/EmojiCategoryFlags";
import EmojiCategoryFood from "../../icons/EmojiCategoryFood";
import EmojiCategoryHistory from "../../icons/EmojiCategoryHistory";
import EmojiCategoryObjects from "../../icons/EmojiCategoryObjects";
import EmojiCategoryPlaces from "../../icons/EmojiCategoryPlaces";
import EmojiCategorySmile from "../../icons/EmojiCategorySmile";
import EmojiCategorySymbols from "../../icons/EmojiCategorySymbols";
import { EmojiCategory } from "../../types/Emoji";

export const emojiCategories: EmojiCategory[] = [
  "History",
  "Smileys & People",
  "Animals & Nature",
  "Food & Drink",
  "Activities",
  "Travel & Places",
  "Objects",
  "Symbols",
  "Flags",
];

type EmojiCategoryIconProps = { category: EmojiCategory; active: boolean };
export const EmojiCategoryIcon = ({
  category,
  active,
}: EmojiCategoryIconProps) => {
  switch (category) {
    case "History":
      return <EmojiCategoryHistory active={active} />;

    case "Smileys & People":
      return <EmojiCategorySmile active={active} />;

    case "Animals & Nature":
      return <EmojiCategoryAnimals active={active} />;

    case "Food & Drink":
      return <EmojiCategoryFood active={active} />;

    case "Activities":
      return <EmojiCategoryActivities active={active} />;

    case "Travel & Places":
      return <EmojiCategoryPlaces active={active} />;

    case "Objects":
      return <EmojiCategoryObjects active={active} />;

    case "Symbols":
      return <EmojiCategorySymbols active={active} />;

    case "Flags":
      return <EmojiCategoryFlags active={active} />;
  }
};
