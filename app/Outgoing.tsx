import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Outgoing() {

    const width = Dimensions.get('window').width;
    const { img, name, phone } = useLocalSearchParams();

    return (
        <View style={styles.main_container}>

            {/* contains name, phone number and call status */}
            <View style={styles.info_a}>
                <Text style={[styles.text, {fontSize: 20}]}>Raghav Kumar</Text>
                <Text style={[styles.text, {fontSize: 14}]}>+91 9582576830</Text>
                <Text style={styles.text}>Calling...</Text>
            </View>
            <Image src={"https://tinyurl.com/sz2wsb7f"} width={width - 100} style={{height: '20%'}} />

            {/* call controls */}
            <View></View>

            <TouchableOpacity style={styles.hangUpBtn}>
                <MaterialCommunityIcons name="phone-hangup" size={32} color="white" />
                <View style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    opacity: 0.25,
                    backgroundColor: '#eb2b2bff'
                }} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: 50,
        gap: 60,
        alignItems: 'center',
        overflow: 'hidden'
    },

    info_a: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },

    text: {
        color: 'white',
        fontFamily: 'monospace'
    },

    hangUpBtn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'red',
        height: '5%',
        width: '10%'
    }
});

export default Outgoing;