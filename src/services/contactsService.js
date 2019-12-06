import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import * as FileSystem from 'expo-file-system';
import { saveContact, loadImage, saveImage } from './fileService';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;

export const initializeAllContacts = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Image
      ],
    });
    for ( i = 0; i < data.length; i++ ) {
      try {
        const fileName = `${contactDirectory}/${data[i].firstName}`;
        let photo = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png'
        let name = ''
        let number = ''
        let lastName = data[i].lastName
        // If contact has photo
        if (data[i].phoneNumbers[0] !== undefined) {
          number = data[i].phoneNumbers[0].number
        }
        if (data[i].firstName == undefined ) {
          name = data[i].phoneNumbers[0].number
        } else {
          name = data[i].firstName
        }
        if (lastName != undefined) {
          name = `${name} ${lastName}`;
        }
        if (data[i].imageAvailable) {
          photo = data[i].image.uri
        }
        await saveImage(photo, name)
        photo = await loadImage(name)
        const contact = {
          name: name,
          phoneNumber: number,
          thumbnailPhoto: photo,
        }

        await saveContact(contact)
      } catch(error) {
        console.log(error)
        continue
      }
  }
  }
  return
}
