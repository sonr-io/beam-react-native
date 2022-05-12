import React from "react";
import Svg, { Path } from "react-native-svg";

const EmojiCategoryFlags = ({ active }: { active: boolean }) => {
  const fillColor = active ? "#FFFFFF" : "#88849C";

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 15H2V1.294h1c.284.33.643.599 1.048.767.406.169.846.241 1.286.212a5.148 5.148 0 002.258-.676A6.035 6.035 0 0110 1c.819.008 1.621.22 2.333.616l.667.43v7.838l-.667-.431A4.893 4.893 0 0010 8.833a5.702 5.702 0 00-2.069.615 6.364 6.364 0 01-2.6.616A3.363 3.363 0 013 9.374V15z"
        fill={fillColor}
        fillOpacity={0.5}
      />
    </Svg>
  );
};

export default EmojiCategoryFlags;
