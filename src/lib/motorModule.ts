import { NativeModules } from "react-native";
const { MotorKit } = NativeModules;
interface MotorInterface {
   newWallet(): boolean;
}
export default MotorKit as MotorInterface;
