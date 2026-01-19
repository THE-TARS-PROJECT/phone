import * as Contacts from 'expo-contacts';


export async function getContacts(){
    const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.Image]
    })
    console.log(data);
    return data;
}