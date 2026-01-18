import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useState } from "react";

export default function DialPad() {

    const [isPressed, setPressed] = useState(false);

    const btns = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["*", "0", "#"]
    ]

    return (
        <View style={styles.main_container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        height: '50%',
        borderWidth: 2,
        borderColor: '#AACFD1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
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
    }
})
