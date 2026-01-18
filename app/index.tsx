import callbridge, { isRoleHeld, requestRole } from "@/modules/callbridge";
import { useEventListener } from "expo";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DialPad from "./components/DialPad";


export default function Home(){

    const [eventDebug, setEventDebug] = useState("");

    useEffect(() => {
        async function roleCheck(){
            const role = await isRoleHeld();
            if (role){
                return;
            }
            requestRole();
        }

        roleCheck();
    }, [])

    useEventListener(callbridge, 'onRoleResult', (event) => {
        console.debug(`Role granted: ${event.granted}`);
    })

    useEventListener(callbridge, "onCallStateChanged", (event) => {
        if(event.isActive){
            setEventDebug("Incoming call");
        }
    })

    return (
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'black'}}>
            <DialPad />
        </View>
    )
}