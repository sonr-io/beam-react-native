import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryFood = ({
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
      <G clipPath="url(#clip0_2687_10728)">
        <Path
          d="M3.932 16L1.9 15.995.625 3.65h5.858L7.299.36a.465.465 0 01.583-.34l.058.018 3.235 1.105-.308.904-2.775-.952-.633 2.556h1.496l-.292 3.007A8.708 8.708 0 004.94 7.719a2.507 2.507 0 00-1.346 2.136c-.002.235.043.467.133.683l-.067.094-.006.01-.007.01a3.35 3.35 0 00-.22.45h-1.62l1.488.392a3.33 3.33 0 00-.109.945 2.396 2.396 0 00.701 1.695 2.716 2.716 0 00-.291 1.054 1.129 1.129 0 00.34.809L3.933 16zm4.83-.035c-2.606 0-4.453-.054-4.477-.758.053-.306.172-.597.348-.853h11.36c.15.263.25.552.293.853 0 .756-2.663.756-5.482.756H8.765l-.004.002zm7.223-2.293H4.658a1.366 1.366 0 01-.701-1.13c-.01-.285.05-.569.17-.828l5.641 1.487 6.671-1.588c.148.25.211.541.179.83a1.408 1.408 0 01-.629 1.23h-.002zm-6.192-1.168l-5.706-1.506H16.11l-6.318 1.506zm5.822-2.175H4.934a.711.711 0 01-.647-.42c0-1.52 2.477-2.582 6.022-2.582a11.643 11.643 0 014.222.678c1.146.466 1.752 1.125 1.752 1.908.002.178-.32.415-.664.415l-.004.001z"
          fill={fillColor}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10728">
          <Path fill="#fff" transform="translate(.625)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryFood;
