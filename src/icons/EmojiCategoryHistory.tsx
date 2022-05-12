import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryHistory = ({ active }: { active: boolean }) => {
  const fillColor = active ? "#FFFFFF" : "#88849C";

  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <G clipPath="url(#clip0_2687_10719)" fill={fillColor}>
        <Path d="M6 12a6 6 0 116-6 6.007 6.007 0 01-6 6zM6 .75a5.25 5.25 0 100 10.5A5.25 5.25 0 006 .75z" />
        <Path d="M6.5 6.492H3v-.75h2.75V1.5h.75v4.992z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10719">
          <Path fill={fillColor} d="M0 0H12V12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryHistory;
