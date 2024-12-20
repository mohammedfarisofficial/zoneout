import Svg, { SvgProps, Path } from "react-native-svg";
import { scale } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

const ClearIconSVG = ({ width = scale(16), height = scale(16), fill = COLORS.GRAY_400, ...props }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 512 512" {...props}>
    <Path
      fill={fill}
      d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256c0 68.383 26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.383 512 256c0-68.379-26.629-132.668-74.98-181.02zm-70.293 256.387c9.761 9.766 9.761 25.594 0 35.356-4.883 4.882-11.282 7.324-17.68 7.324s-12.797-2.442-17.68-7.324L256 291.355l-75.367 75.372c-4.883 4.878-11.281 7.32-17.68 7.32s-12.797-2.442-17.68-7.32c-9.761-9.766-9.761-25.594 0-35.356L220.645 256l-75.372-75.367c-9.761-9.766-9.761-25.594 0-35.356 9.766-9.765 25.594-9.765 35.356 0L256 220.645l75.367-75.368c9.766-9.761 25.594-9.765 35.356 0 9.765 9.762 9.765 25.59 0 35.356L291.355 256zm0 0"
      data-original="#000000"
    />
  </Svg>
);

export default ClearIconSVG;
