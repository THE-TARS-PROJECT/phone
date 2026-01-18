import { StyleSheet, Text, View } from "react-native";

function Appbar({title}: {title: string}) {
  return (
    <View style={styles.main_container}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    main_container: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "100%",
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#AACFD1'
    },

    text: {
        color: '#05080D',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'monospace'
    }
})

export default Appbar;