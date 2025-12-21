import callbridge from "@/modules/callbridge";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Home(){

    const [result, setResult] = useState(false);

    useEffect(() => {
        async function test(){
            const test = await callbridge.isRoleHeld();        
            setResult(test);
        }
        test(); 
    }, [])

    return (
        <View>
            <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
    )
}