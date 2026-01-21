import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from './components/IconButton';

import { endCall } from '@/modules/callbridge';

function Outgoing() {

    const router = useRouter();
    const width = Dimensions.get('window').width;
    const { img, name, phone } = useLocalSearchParams();

    return (
        <View style={styles.main_container}>

            {/* contains name, phone number and call status */}
            <View style={styles.info_a}>
                <Text style={[styles.text, {fontSize: 20}]}>{name}</Text>
                <Text style={[styles.text, {fontSize: 14}]}>{phone}</Text>
                <Text style={styles.text}>Calling...</Text>
            </View>
            <Image src={"https://tinyurl.com/sz2wsb7f"} width={width - 100} style={{height: '20%'}} />

            {/* call controls */}
            <View style={styles.callControls}>
                <IconButton icon={'mic'}></IconButton>
                <IconButton icon={'volume-high'}></IconButton>
                <IconButton icon={'pause'}></IconButton>
                <IconButton icon={'recording'}></IconButton>
                <IconButton icon={'keypad'}></IconButton>
                <IconButton icon={'add-outline'}></IconButton>
            </View>

            <TouchableOpacity style={styles.hangUpBtn} onPress={() => {
                async function _endCall(){
                    const isDisconnected = await endCall();
                    if(isDisconnected){
                        router.back();
                    }
                }

                _endCall();
            }} >
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
    },
    
    callControls: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});

export default Outgoing;