import { Pressable, StyleSheet, Text } from "react-native";

export default function Contact({ name }: { name: string }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.main_container,
                {
                    backgroundColor: pressed ? '#AACFD1' : 'black',
                }
            ]} >
            {({ pressed }) => (
                <Text style={[
                    styles.text,
                    { color: pressed ? 'black' : '#AACFD1' }
                ]}>{name}</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main_container: {
        padding: 20,
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'monospace'
    }
})
