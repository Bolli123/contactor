import * as FileSystem from 'expo-file-system';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;
const imageDirectory = `${FileSystem.documentDirectory}images`;

export const copyFile = async (file, newLocation) => {
  return FileSystem.copyAsync({
    from: file,
    to: newLocation
  });
};

export const moveFile = async (file, newLocation) => {
  return FileSystem.moveAsync({
    from: file,
    to: newLocation
  });
};

const loadContact = async (fileName) => {
  return FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const loadImage = async (fileName) => {
  return FileSystem.readAsStringAsync(`${imageDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.Base64
});
}

export const saveContact = async (contact) => {
  const fileName = `${contactDirectory}/${contact.name}`;
  console.log("Contact: " + typeof contact)
  const contactString = JSON.stringify(contact)
  console.log("contactString: " + typeof contactString)
  FileSystem.writeAsStringAsync(fileName, contactString)
  const retContact = await loadContact(contact.name)
  return {
    name: retContact.name,
    phoneNumber: retContact.phoneNumber,
    thumbnailPhoto: retContact.thumbnailPhoto
  };
};

export const getImagePath = (fileName) => {
  return `${imageDirectory}/${fileName}`
}

export const saveImage = async (imageLocation, fileName) => {
  await copyFile(imageLocation, `${imageDirectory}/${fileName}`);
  return {
    name: fileName,
    file: await loadImage(fileName)
  };
}

export const deleteContact = async (contactName) => {
  const deleteContactDirectory = `${contactDirectory}/${contactName}`
  const deleteImageDirectory = `${imageDirectory}/${contactName}`
  FileSystem.deleteAsync(deleteContactDirectory)
  FileSystem.deleteAsync(deleteImageDirectory, { idempotent: true })
}

const setUpDirectory = async () => {
  const contactDir = await FileSystem.getInfoAsync(contactDirectory);
  const imageDir = await FileSystem.getInfoAsync(imageDirectory);
  if (!contactDir.exists) {
    await FileSystem.makeDirectoryAsync(contactDirectory);
  }
  if (!imageDir.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory);
  }
}

export const initializeAllContacts = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Image],
    });
    for ( i = 0; i < data.length; i++ ) {
      const fileName = `${contactDirectory}/${data[i].firstName}`;
      const photo = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png'
      // If contact has photo
      if (data[i].imageAvailable) {
        photo = data[i].image.uri
      }
      const contact = {
        name: data[i].firstName,
        phoneNumber: data[i].phoneNumbers[0].digits,
        thumbnailPhoto: photo,
      }
      const contactString = JSON.stringify(contact)
      FileSystem.writeAsStringAsync(fileName, contactString)
    }
  }
}

export const getAllContacts = async () => {
  await setUpDirectory();
  await initializeAllContacts();
  const result = await FileSystem.readDirectoryAsync(contactDirectory);
  return Promise.all(result.map(async (fileName) => {
    const contact = await loadContact(fileName)
    const parsedContact = JSON.parse(contact)
    return {
      name: fileName,
      phoneNumber: parsedContact.phoneNumber,
      thumbnailPhoto: parsedContact.thumbnailPhoto
    };
  }));
};

export const editContact = async (oldName, newContactInfo) => {
  const fileName = `${contactDirectory}/${newContactInfo.name}`
  if (oldName !== newContactInfo.name) {
    await moveFile(`${contactDirectory}/${oldName}`, fileName)
    await moveFile(`${imageDirectory}/${oldName}`, `${imageDirectory}/${newContactInfo.name}`)
  }
  newContactInfo.thumbnailPhoto = `${imageDirectory}/${newContactInfo.name}`
  const newContactInfoString = JSON.stringify(newContactInfo)
  FileSystem.writeAsStringAsync(fileName, newContactInfoString)
}
