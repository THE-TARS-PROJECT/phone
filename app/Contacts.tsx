import { getContacts } from "@/utils/ContactsManager";
import { ExistingContact } from "expo-contacts";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Contact from "./components/Contact";

export default function Contacts(){

    const [contacts, setContacts] = useState<ExistingContact[]>();

    useEffect(() => {
        (async () => {
            const contacts_ = await getContacts();
            setContacts(contacts_);
        })();
    }, [])

    return (
        <View style={styles.main_container}>
            <FlatList 
                data={contacts}
                numColumns={1}
                renderItem={({item}) => (
                    <Contact name={item.name} />
                )}
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#000'
    }
})