import { Text, View, Button } from "react-native";

export default function TestEvent(){
    return (
        <View>
            <Button title={'Emit Incoming Call'}></Button>
            <Button title={'Emit Outgoing Call'}></Button>
        </View>
    )
}
