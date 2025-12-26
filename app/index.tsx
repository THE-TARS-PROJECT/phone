import callbridge, { isRoleHeld, requestRole } from "@/modules/callbridge";
import { useEventListener } from "expo";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

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
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Button title={'Simulate Incoming Call'} onPress={() => {
                callbridge.simulateCall();
            }} />
        </View>
    )
}