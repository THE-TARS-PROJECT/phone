import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

export default function DialPad() {

    const [dialText, setDialText] = useState("");

    const btns = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["*", "0", "#"]
    ]

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
            <View>
                {btns.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row} >
                        {row.map((btn) => (
                            <Pressable
                                onPress={() => {
                                    appendDialText(btn.toString());
                                }}
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
            <TouchableOpacity>
                <Ionicons name="call" size={30} color="#AACFD1" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        gap: 50,
        height: "40%",
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
    },

    btn: {
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    displayBox: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },

    sub_container: {
        flexDirection: 'row'
    }
})
