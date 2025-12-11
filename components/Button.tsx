import { View, Text, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent } from "react-native"

type ButtonProps = {
    title: string,
    onPress?: (event: GestureResponderEvent) => void
} & TouchableOpacityProps

export default function CButton({
    title, onPress
}: ButtonProps){
    return (
        <TouchableOpacity className={'bg-white'} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}
