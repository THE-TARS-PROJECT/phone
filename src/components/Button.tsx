import { useState } from "react"
import {View, Text, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent, DimensionValue } from "react-native"

type ButtonProps = {
    title: string,
    minWidth: DimensionValue,
    minHeight: DimensionValue,
    onPress_?: (event: GestureResponderEvent) => void
} & TouchableOpacityProps

export default function CButton({
    title, onPress_, minWidth, minHeight
}: ButtonProps){

    const [textStyle, setTextStyle] = useState("text-md text-white");

    return (
        <TouchableOpacity 
            className={'flex-col border-2 border-blue-800 p-4 w-content active:bg-blue-500 rounded-md justify-between items-center'}
            style={{alignSelf: "flex-start", minWidth: minWidth, minHeight: minHeight}}
            onPress={(event) => {
                onPress_?.(event);
            }}>
            <Text className={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}
