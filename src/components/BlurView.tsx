import { BlurView } from "expo-blur";
import { Platform, View } from "react-native";

const Blur = Platform.OS === "ios" ? BlurView : View;

export default Blur;
