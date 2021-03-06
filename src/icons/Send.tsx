import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

const Send = () => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Path
      d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
      fill="url(#paint0_linear_2455_12813)"
    />
    <Path
      d="M21.5618 16.5229L16.3759 10.5463C16.329 10.4922 16.271 10.4489 16.2059 10.4191C16.1408 10.3894 16.0701 10.374 15.9985 10.374C15.927 10.374 15.8562 10.3894 15.7911 10.4191C15.726 10.4489 15.6681 10.4922 15.6212 10.5463L10.4368 16.5229C10.4211 16.5409 10.411 16.563 10.4075 16.5866C10.4041 16.6103 10.4075 16.6344 10.4174 16.6561C10.4273 16.6779 10.4432 16.6963 10.4633 16.7092C10.4833 16.7222 10.5067 16.7291 10.5306 16.7291H11.7962C11.8681 16.7291 11.9368 16.6979 11.9853 16.6432L15.4056 12.701V21.4994C15.4056 21.5682 15.4618 21.6244 15.5306 21.6244H16.4681C16.5368 21.6244 16.5931 21.5682 16.5931 21.4994V12.701L20.0134 16.6432C20.0603 16.6979 20.129 16.7291 20.2024 16.7291H21.4681C21.5743 16.7291 21.6321 16.6041 21.5618 16.5229Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2455_12813"
        x1="32.3886"
        y1="32"
        x2="0"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4D74FD" />
        <Stop offset="0.427083" stopColor="#4DAEF8" />
        <Stop offset="1" stopColor="#4DFDF2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Send;
