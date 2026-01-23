import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useState } from "react";

import { placeCall } from "@/modules/callbridge";
import { useRouter } from "expo-router";

export default function DialPad() {

<<<<<<< HEAD
    const router = useRouter();
    const [dialText, setDialText] = useState("");
=======
    const [isPressed, setPressed] = useState(false);
>>>>>>> parent of f08653a (added digit box and call button)

    const btns = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["*", "0", "#"]
    ]

<<<<<<< HEAD
    async function _placeCall(){
        let status = await placeCall(dialText);
        if(status){
            router.push({
                pathname: '/Outgoing',
                params: {
                    "image": "",
                    "name": "Unknown",
                    "phone": dialText
                }
            })
        }

        else{
            console.log("failed to place call");
        }
    }

    function appendDialText(digit: string) {
        setDialText(`${dialText}${digit}`);
    }

    function trimDialText() {
        let copy = dialText;
        setDialText(copy.substring(0, copy.length - 1));
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.sub_container}>
                <View style={styles.displayBox}>
                    <Text style={{
                        color: '#AACFD1',
                        fontSize: 24,
                    }}>{dialText}</Text>
                </View>
                <TouchableOpacity onPress={trimDialText}>
                    <Ionicons name="backspace" size={28} color="red" />
                </TouchableOpacity>
            </View>
=======
    return (
        <View style={styles.main_container}>
>>>>>>> parent of f08653a (added digit box and call button)
            <View>
                {btns.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row} >
                        {row.map((btn) => (
                            <Pressable
                                key={btn} style={({ pressed }) => [
                                    styles.btn,
                                    {
                                        backgroundColor: pressed ? '#AACFD1' : 'black',
                                        borderWidth: pressed ? 1 : 0,
                                        borderColor: pressed ? '#AACFD1' : 'black',
                                        borderRadius: pressed ? 5 : 0
                                    }
                                ]} >
                                {({ pressed }) => (
                                    <Text style={[
                                        styles.text,
                                        { color: pressed ? 'black' : '#AACFD1' }
                                    ]}>{btn}</Text>
                                )}
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
<<<<<<< HEAD
            <TouchableOpacity onPress={() => {
                _placeCall();                
            }}>
                <Ionicons name="call" size={30} color="#AACFD1" />
            </TouchableOpacity>
=======
>>>>>>> parent of f08653a (added digit box and call button)
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
<<<<<<< HEAD
        flex: 1,
        gap: 50,
        height: "40%",
=======
        height: '50%',
>>>>>>> parent of f08653a (added digit box and call button)
        borderWidth: 2,
        borderColor: '#AACFD1',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 24
    },

    row: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    btn: {
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
<<<<<<< HEAD
    },

    displayBox: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },

    sub_container: {
        flexDirection: 'row'
=======
>>>>>>> parent of f08653a (added digit box and call button)
    }
})
