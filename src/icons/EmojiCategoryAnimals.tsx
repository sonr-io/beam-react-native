import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryAnimals = ({
  active,
  width = 28,
  height = 28,
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
      viewBox="0 0 25 24"
    >
      <G clipPath="url(#clip0_2688_10724)">
        <Path
          d="M12.803 20a4.59 4.59 0 01-3.47-1.641h-.51a4.302 4.302 0 01-2.519-1.005 4.277 4.277 0 01-1.412-2.309A4.673 4.673 0 016.49 10.5a5.97 5.97 0 01-1.257-2.455 3.161 3.161 0 01.794-3.021A3.123 3.123 0 018.268 4h.051a4.914 4.914 0 013.109 1.403l.08.072a6.136 6.136 0 012.671-.072A4.9 4.9 0 0117.285 4h.054a3.125 3.125 0 012.24 1.024 3.169 3.169 0 01.794 3.028 5.937 5.937 0 01-1.262 2.455 4.688 4.688 0 011.59 4.537 4.284 4.284 0 01-1.418 2.31c-.71.598-1.596.95-2.523 1.004h-.51A4.49 4.49 0 0112.803 20zm0-2.305a.994.994 0 00.668.251 1.007 1.007 0 001.028-.969l-.67-.032a.342.342 0 01-.358.333.308.308 0 01-.234-.086.367.367 0 01-.092-.243v-.735a2.063 2.063 0 001.126-1.362.539.539 0 00-.553-.545h-1.846a.543.543 0 00-.553.545 2.045 2.045 0 001.136 1.367v.731c0 .09-.033.176-.092.243a.31.31 0 01-.235.086.346.346 0 01-.357-.333l-.67.03a1.008 1.008 0 001.027.971.988.988 0 00.67-.25l.005-.002zm3.005-6.395c-.37 0-.67.45-.67 1.002s.3 1.002.67 1.002c.369 0 .67-.45.67-1.002s-.303-1.002-.67-1.002zm-6.032 0c-.37 0-.67.45-.67 1.002s.301 1.002.67 1.002c.369 0 .67-.45.67-1.002s-.304-1.002-.67-1.002z"
          fill={fillColor}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2688_10724">
          <Path
            fill={fillColor}
            transform="translate(4.75 4)"
            d="M0 0H16V16H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryAnimals;
