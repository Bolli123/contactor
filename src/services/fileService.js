import * as FileSystem from 'expo-file-system';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;
const imageDirectory = `${FileSystem.documentDirectory}images`;

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

export const loadImage = async (fileName) => {
  return FileSystem.readAsStringAsync(`${imageDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.Base64
});
}

export const saveContact = async (contact) => {
  const fileName = `${contactDirectory}/${contact.name}`;
  const contactString = JSON.stringify(contact)
  FileSystem.writeAsStringAsync(fileName, contactString)
  const retContact = await loadContact(contact.name)
  return {
    name: retContact.name,
    phoneNumber: retContact.phoneNumber,
    thumbnailPhoto: retContact.thumbnailPhoto
  };
};

export const editContact = async (oldName, newContactInfo) => {
  const fileName = `${contactDirectory}/${oldName}`
  const newContactInfoString = JSON.stringify(newContactInfo)
  FileSystem.writeAsStringAsync(fileName, newContactInfoString)
}

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
  FileSystem.deleteAsync(deleteImageDirectory)
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

export const getAllContacts = async () => {
  await setUpDirectory();
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
