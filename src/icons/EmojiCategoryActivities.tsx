import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const EmojiCategoryActivities = ({
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
      <G clipPath="url(#clip0_2687_10731)">
        <Path
          d="M8.5 16a8 8 0 118-8 8.009 8.009 0 01-8 8zm-2.838-1.697h1.569l2.615.99.041-.004c.24-.031.476-.075.71-.13l.543-.13-.523-.19a7.17 7.17 0 001.103-.444v.08l.291-.234c.071-.04.143-.083.214-.126l.183.052V14c.222-.145.435-.302.64-.47l-.639-.161v-1.996l1.656-2.486-.01-.017 1.343-.311.2.37c.017-.124.031-.26.043-.426l.429-.1-.225-.421.052-.268-.24.064a7.145 7.145 0 00-.083-.891h-.06l-.188.98-1.63.433-1.289-2.035V3.77l1.65-.785A7.832 7.832 0 009.477.64v1.003L6.795 3.04h-2.07l-.428-1.41-.2.224-.039.042-.01.011c-.1.11-.142.162-.192.222l-.01.012-.058.07.35 1.06-1.282 2.055-1.605.716-.018.078c-.03.132-.058.27-.083.423l-.048.31 1.854-.826 1.107 1.557.013 2.87-1.088 1.09.049.056-1.163.186.548.537 1.094-.176 1.533 1.752-.035 1.21.391-.19.233.063.02-.677.004-.001zm4.729.454l-2.918-1.064v-1.455l2.356-1.266 1.946.73-.04 2.019-1.35.96.009.074-.003.002zM7.15 11.71L4.7 10.347 4.686 7.63l2.006-1.304 2.802 1.572v2.547l-2.343 1.264H7.15zm2.72-4.314l-2.79-1.57-.16-2.133L9.728 2.23l2.06 1.298v2.88l-1.915.982-.004.004z"
          fill={fillColor}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2687_10731">
          <Path fill={fillColor} transform="translate(.5)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmojiCategoryActivities;
