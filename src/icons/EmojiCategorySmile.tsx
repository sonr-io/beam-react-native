import React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const EmojiCategorySmile = ({
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
      viewBox="0 0 17 16"
      fill={fillColor}
    >
      <G clipPath="url(#clip0_2687_10722)">
        <Path
          d="M.875 8a8 8 0 118 8 8.01 8.01 0 01-8-8zm2.69.842a4.555 4.555 0 001.542 3.392 5.533 5.533 0 003.744 1.4 5.1 5.1 0 005.346-4.8c0-.122-.1-.179-.3-.179a7.323 7.323 0 00-1.224.209 17.53 17.53 0 01-3.793.5 17.513 17.513 0 01-3.792-.5 7.268 7.268 0 00-1.224-.21c-.203.009-.299.066-.299.189v-.001zm7.06-3.176a.92.92 0 101.834 0 .92.92 0 10-1.833 0h-.001zm-5.083-.692a.952.952 0 00-.255.69.964.964 0 00.923 1 .962.962 0 00.922-1 .961.961 0 00-.922-1 .956.956 0 00-.668.31zm-.667 4.741c0-.439 1.571.5 4 .5 2.429 0 4-.94 4-.5 0 1.913-2.774 2-4 2-1.092 0-4-.086-4-2z"
          fill={fillColor}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10722">
          <Path
            fill={fillColor}
            transform="translate(.875)"
            d="M0 0H16V16H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategorySmile;
