import { Slot, useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import Appbar from "./components/Appbar"
import BottomBar from "./components/Bottombar"

export default function RootLayout() {

    const [title, setTitle] = useState("recent calls");
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Appbar title={title} />
            <View style={styles.content}>
                <Slot />
            </View>
            <BottomBar
                onBookPressed={() => {
                    console.log("Book pressed");
                    setTitle("contacts");
                    router.push("/Contacts");
                }}

                onDialPadPressed={() => {
                    console.log("Dial Pressed pressed");
                    setTitle("recent calls");
                    router.push("/");
                }}

                onGearPressed={() => {
                    console.log("Setting pressed");
                    setTitle("settings");
                    router.push("/Settings");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },

    container: {
        flex: 1
    }
})