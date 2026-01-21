import { Stack, usePathname, useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Appbar from "./components/Appbar"
import BottomBar from "./components/Bottombar"

export default function RootLayout() {

    const [title, setTitle] = useState("recent calls");

    type screenRoutes = '/' | '/Contacts' | '/Settings' | '/Outgoing';
    const titles: Record<string, string> = {
        "/": "recent calls",
        "/Contacts": "contacts",
        "/Settings": "settings",
        "/Outgoing": "outgoing call"
    }
    
    const router = useRouter();
    const pathname = usePathname();

    function switchPage(screen: screenRoutes){
        if(pathname == screen) return;
        setTitle(titles[screen])
        router.push(screen);
    }

    return (
        <SafeAreaView edges={['top']} style={{
            flex: 1,
            backgroundColor: '#AACFD1'
        }}>
            <View style={styles.container}>
                <Appbar title={title} />
                <View style={styles.content}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'slide_from_left',
                            animationDuration: 10
                        }}
                     />
                </View>
                <BottomBar
                    onBookPressed={() => {
                        console.log("Book pressed");
                        switchPage('/Contacts')
                    }}

                    onDialPadPressed={() => {
                        console.log("Dial Pressed pressed");
                        switchPage("/");
                    }}

                    onGearPressed={() => {
                        console.log("Setting pressed");
                        // switchPage("/Settings");
                        switchPage("/Outgoing");
                    }}
                />
            </View>
        </SafeAreaView>
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