import { useState } from "react"
import {View, Text, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent } from "react-native"

type ButtonProps = {
    title: string,
    onPress?: (event: GestureResponderEvent) => void
} & TouchableOpacityProps

export default function CButton({
    title, onPress
}: ButtonProps){

    const [textStyle, setTextStyle] = useState("text-md text-white")

    function onPressWrapped(color: string){
        onPress?.call
        setTextStyle('text-md text-'.concat(color))
    }

    return (
        <TouchableOpacity 
            className={'flex-col border-2 border-blue-500 p-4 w-content active:bg-blue-400 rounded-md'}
            style={{alignSelf: "flex-start"}}
            onPress={() => {
                onPressWrapped("white")
            }}>
            <Text className={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}
