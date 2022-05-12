import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryObjects = ({ active }: { active: boolean }) => {
  const fillColor = active ? "#FFFFFF" : "#88849C";

  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none">
      <G clipPath="url(#clip0_2687_10737)">
        <Path
          d="M8.253 16a10.909 10.909 0 01-1.57-.136.9.9 0 01-.776-.875v-1.953l-.1-.87A4.652 4.652 0 004.233 9.22a4.97 4.97 0 01-1.65-3.887A5.514 5.514 0 018.253 0a5.514 5.514 0 015.666 5.333 4.969 4.969 0 01-1.646 3.887 4.643 4.643 0 00-1.575 2.946l-.1.87v1.952a.9.9 0 01-.776.875A10.91 10.91 0 018.253 16zM6.91 13v1.887c.44.068.885.106 1.33.113a9.578 9.578 0 001.355-.113V13H6.91zm.173-4.687l.838.773v2.247h.662V9.086l.838-.773a.667.667 0 10-.487-.494l-.684.632-.685-.632a.666.666 0 10-.487.494h.005z"
          fill={fillColor}
          fillOpacity={0.5}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10737">
          <Path fill="#fff" transform="translate(.25)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryObjects;
