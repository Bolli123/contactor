import * as FileSystem from 'expo-file-system';

const contactDirectory = `${FileSystem.documentDirectory}contacts`;
const imageDirectory = `${contactDirectory}/images`;

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

const loadImage = async (fileName) => {
  return FileSystem.readAsStringAsync(`${imageDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

export const saveContact = async (contact) => {
  const fileName = `${contactDirectory}/${contact.name}`;
  const imageDir = `${imageDirectory}/${contact.name}`
  const contactString = JSON.stringify(contact)
  FileSystem.writeAsStringAsync(fileName, contactString)
  const retContact = await loadContact(contact.name)
  return {
    name: retContact.name,
    thumbnailPhoto: imageDir,
    phoneNumber: retContact.phoneNumber,
  };
};

export const saveImage = async (imageLocation) => {
  const folderSplit = imageLocation.split('/');
  const fileName = folderSplit[folderSplit.length - 1];
  await copyFile(imageLocation, `${imageDirectory}/${fileName}`);
  return {
    name: fileName,
    type: 'image',
    file: await loadImage(fileName)
  };
}

export const deleteContact = async (contactName) => {
  const deleteDirectory = `${contactDirectory}/${contactName}`
  FileSystem.deleteAsync(deleteDirectory)
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
    return {
      name: fileName,
      phoneNumber: contact.phoneNumber,
      thumbnailPhoto: `${imageDirectory}/${contact.name}`
    };
  }));
};
