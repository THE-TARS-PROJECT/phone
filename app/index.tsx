import callbridge, { isRoleHeld, requestRole } from "@/modules/callbridge";
import { useEventListener } from "expo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DialPad from "./components/DialPad";

import * as Contacts from 'expo-contacts';
import { useRouter } from "expo-router";


export default function Home() {

    const router = useRouter();

    const [eventDebug, setEventDebug] = useState("");
    const [title, setTitle] = useState("Recent Calls");

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status == 'granted') {
                console.log("permission granted");
            }

            else {
                console.log("permission denied");
            }
        })
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
            setEventDebug("Incoming call");
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