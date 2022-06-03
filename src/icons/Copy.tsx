import React from "react";
import Svg, { Path } from "react-native-svg";

const Icon = () => {
  return (
    <Svg width={20} height={22} viewBox="0 0 20 22" fill="none">
      <Path
        d="M16.5.5H3.937a.188.188 0 00-.187.188V2c0 .103.084.188.188.188h11.624v16.125c0 .103.085.187.188.187h1.313a.188.188 0 00.187-.188V1.25A.75.75 0 0016.5.5zm-3 3h-12a.75.75 0 00-.75.75v12.438c0 .2.08.39.22.53l4.062 4.062a.78.78 0 00.173.129v.044h.099c.082.03.169.047.258.047H13.5a.75.75 0 00.75-.75V4.25a.75.75 0 00-.75-.75zM5.203 19.067l-2.018-2.02h2.018v2.02zm7.36.745h-5.86v-3.328a.937.937 0 00-.937-.937H2.437V5.187h10.126v14.625z"
        fill="#858090"
      />
    </Svg>
  );
};

export default Icon;
