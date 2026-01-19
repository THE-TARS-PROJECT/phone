import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Contact({ name, image }: { name: string, image: string | null }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.main_container,
                {
                    backgroundColor: pressed ? '#AACFD1' : 'black',
                }
            ]} >
            {({ pressed }) => (
                <View style={styles.sub_container}>
                    <FontAwesome5 name="user-alt" size={24} color={
                        pressed ? 'black' : '#AACFD1'
                    } />
                    <Text style={[
                        styles.text,
                        { color: pressed ? 'black' : '#AACFD1' }
                    ]}>{name}</Text>
                </View>
            )}

        </Pressable>
    )
}

const styles = StyleSheet.create({
    main_container: {
        padding: 20,
    },

    sub_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'monospace'
    }
})
