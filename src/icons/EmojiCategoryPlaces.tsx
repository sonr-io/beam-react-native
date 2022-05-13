import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryPlaces = ({
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
      <G clipPath="url(#clip0_2687_10734)">
        <Path
          d="M5.375 15.999h-2v-1.334A.667.667 0 012.709 14v-2.666a.667.667 0 01.666-.667h1v-1a3.1 3.1 0 013.109-3h1.783a3.1 3.1 0 013.108 3v1h1a.668.668 0 01.667.667V14a.667.667 0 01-.667.666V16h-2v-1.334h-6V16zm-2-2.666v.656h10v-.656h-2.5v-.01a.334.334 0 00-.334-.334H6.208a.333.333 0 00-.333.333v.011h-2.5zm8.834-1.927a.75.75 0 10.002 1.5.75.75 0 00-.002-1.5zm-7.687 0a.75.75 0 10.53.22.751.751 0 00-.531-.22h.001zm3.853-3.74c-3 0-3 1.457-3 3h6v-.01A3.685 3.685 0 0011 8.587c-.425-.628-1.257-.921-2.625-.921zm-7 7.324h-1v-9h3.34L3.709 0h7v3.99h5.666v11h-1V5h-4.667v1h-1V1h-5L4.7 7H1.375v7.99zm13-6h-1v-1h1v1zm-11 0h-1v-1h1v1zm11-2h-1v-1h1v1zM8.708 5h-1V4h1v1zm-2 0h-1V4h1v1zm2-2h-1V2h1v1zm-2 0h-1V1.99l1 .01v1z"
          fill={fillColor}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10734">
          <Path
            fill={fillColor}
            transform="translate(.375)"
            d="M0 0H16V16H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryPlaces;
