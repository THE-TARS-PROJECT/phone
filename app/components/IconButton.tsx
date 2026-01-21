import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable, StyleSheet } from "react-native"

function IconButton({icon}: {icon: string}) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.btn,
                {
                    backgroundColor: pressed ? '#AACFD1' : 'black',
                    borderWidth: pressed ? 1 : 0,
                    borderColor: pressed ? '#AACFD1' : 'black',
                    borderRadius: pressed ? 5 : 0
                }
            ]} >
            {({ pressed }) => (
                <Ionicons style={[
                    styles.text,
                    { color: pressed ? 'black' : '#AACFD1' }
                ]} name={icon}></Ionicons>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
        btn: {
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 24
    }
})

export default IconButton