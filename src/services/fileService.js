import * as FileSystem from 'expo-file-system';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;

export const copyFile = async (file, newLocation) => {
  return FileSystem.copyAsync({
    from: file,
    to: newLocation
  });
};

const loadContact = async (fileName) => {
  return FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const saveContact = async (contact) => {
  const fileName = contactDirectory + '/' + contact.name
  const contactString = JSON.stringify(contact)
  FileSystem.writeAsStringAsync(fileName, contactString)
  const retContact = await loadContact(contact.name)
  return {
    name: retContact.name,
    thumbnailPhoto: retContact.thumbnailPhoto,
    phoneNumber: retContact.phoneNumber,
  };
};

const setUpDirectory = async () => {
  const dir = await FileSystem.getInfoAsync(contactDirectory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(contactDirectory);
  }
}

export const getAllContacts = async () => {
  await setUpDirectory();
  const result = await FileSystem.readDirectoryAsync(contactDirectory);
  return Promise.all(result.map(async (fileName) => {
    const contact = await loadContact(fileName)
    return {
      name: fileName,
      phoneNumber: contact.phoneNumber,
      thumbnailPhoto: contact.thumbnailPhoto
    };
  }));
};
