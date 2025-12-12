import { NativeModules } from "react-native";

export interface DialerModuleType{
    requestRole(): Promise<string>;
}