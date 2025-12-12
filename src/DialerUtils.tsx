import { NativeModules } from "react-native";

const { app_re } = NativeModules;

export async function requestRole(){
    try{
        const res = await app_re.requestRole();
        console.log("role granted: ", res);
    } catch(e){
        console.log("role denied: ", e);
    }
}
