import CButton from "./Button";
import { useState } from "react";
import { View, FlatList, TextInput, Button } from "react-native";


export default function DialPad(){
    const [num, setNum] = useState("");
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "*"];

    function onDialPadBtnPress(num_: string){
        const updatedNum = `${num}${num_}`
        console.log(num_);
        setNum(updatedNum);
    }

    function onBackPress(){
        let temp_num = num;
        setNum(
            temp_num.slice(0, -1)
        );
    }

    return (
        <View className={"gap-8"}>
            <View className={"flex-row"}>
                <TextInput className={'flex-1 text-white'} editable={false} textAlign={"center"} value={num} />
                <CButton title={'<'} minHeight={10} minWidth={10} onPress_={onBackPress} />
            </View>
            <FlatList
                columnWrapperClassName={'gap-4 mb-4'}
                numColumns={3}
                data={nums}
                renderItem={({item}) => <CButton onPress_={() => {
                    onDialPadBtnPress(item.toString());
                }} minHeight={60} minWidth={70} title={item} />}
             />
             <Button title={'Call'}></Button>
        </View>
    )
}
