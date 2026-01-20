import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function BottomBar({ onBookPressed, onDialPadPressed, onGearPressed }:
    {
        onBookPressed: () => void,
        onDialPadPressed: () => void,
        onGearPressed: () => void
    }) {
    return (
        <View style={styles.main_container}>
            <TouchableOpacity onPress={onBookPressed} >
                <FontAwesome name="book" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDialPadPressed}>
                <Entypo name="dial-pad" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onGearPressed}>
                <FontAwesome name="gear" size={28} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        height: 60,
        padding: 5,
        backgroundColor: '#AACFD1',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80
    }
})