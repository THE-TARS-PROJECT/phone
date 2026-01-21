import callbridge, { isRoleHeld, registerPa, requestRole } from "@/modules/callbridge";
import { useEventListener } from "expo";
import { useEffect } from "react";
import { Text, View } from "react-native";
import DialPad from "./components/DialPad";

import * as Contacts from 'expo-contacts';


export default function Home() {

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status == 'granted') {
                console.log("permission granted");
            }

            else {
                console.log("permission denied");
            }
        })();

        async function init(){
            let register = await registerPa();
            if(!register){
                console.log("failed to register phone account");
                return;
            }
            console.log("phone account registered");
            return;
        }

        init();
    })

    useEffect(() => {
        async function roleCheck() {
            const role = await isRoleHeld();
            if (role) {
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
        if (event.isActive) {
            console.log("incoming call")
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'black' }}>
            {/* <Appbar title={title}></Appbar> */}
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16
                }}>CALL LOGS HERE</Text>
            </View>
            <DialPad />
        </View>
    )
}