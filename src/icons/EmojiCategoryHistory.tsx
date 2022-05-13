import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryHistory = ({
  active,
  width = 24,
  height = 24,
}: {
  active: boolean;
  width?: number;
  height?: number;
}) => {
  const fillColor = active ? "#FFFFFF" : "#88849C";
  const fillOpacity = active ? 1 : 0.5;

  return (
    <Svg
      width={width / (active ? 2 : 1)}
      height={height / (active ? 2 : 1)}
      viewBox="0 0 12 12"
      fill={fillColor}
    >
      <G
        clipPath="url(#clip0_2687_10719)"
        fill={fillColor}
        fillOpacity={fillOpacity}
      >
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
