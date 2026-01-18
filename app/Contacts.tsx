import { getContacts } from "@/utils/ContactsManager";
import { ExistingContact } from "expo-contacts";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Contacts(){

    const [contacts, setContacts] = useState<ExistingContact[]>();

    useEffect(() => {
        (async () => {
            const contacts_ = await getContacts();
            setContacts(contacts_);
        })
    }, [])

    return (
        <View style={styles.main_container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})