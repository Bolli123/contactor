import * as FileSystem from 'expo-file-system';
var iceChars = require("icelandic-characters");

const contactDirectory = `${FileSystem.documentDirectory}contacts`;
const imageDirectory = `${FileSystem.documentDirectory}images`;

export const regexName = async (fileName) => {
  fileName = `${fileName}`
  const outString = iceChars.replaceIcelandicCharacters(fileName)
  return outString;
}

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
  const contactName = await regexName(fileName)
  return FileSystem.readAsStringAsync(`${contactDirectory}/${contactName}`, {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const loadImage = async (fileName) => {
  const contactName = await regexName(fileName)
  return FileSystem.readAsStringAsync(`${imageDirectory}/${contactName}`, {
    encoding: FileSystem.EncodingType.Base64
});
}

export const saveContact = async (contact) => {
  const contactName = await regexName(contact.name)
  const fileName = `${contactDirectory}/${contactName}`;
  const contactString = JSON.stringify(contact)
  FileSystem.writeAsStringAsync(fileName, contactString)
  const retContact = await loadContact(contactName)
  return {
    name: retContact.name,
    phoneNumber: retContact.phoneNumber,
    thumbnailPhoto: retContact.thumbnailPhoto
  };
};

export const getImagePath = async (fileName) => {
  const contactName = await regexName(fileName)
  return `${imageDirectory}/${contactName}`
}

export const saveImage = async (imageLocation, fileName) => {
  const contactName = await regexName(fileName)
  await copyFile(imageLocation, `${imageDirectory}/${contactName}`);
  return {
    name: contactName,
    file: await loadImage(contactName)
  };
}

export const deleteContact = async (contactName) => {
  const contactNameReg = await regexName(contactName)
  const deleteContactDirectory = `${contactDirectory}/${contactNameReg}`
  const deleteImageDirectory = `${imageDirectory}/${contactNameReg}`
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

export const getAllContacts = async () => {
  await setUpDirectory();
  const result = await FileSystem.readDirectoryAsync(contactDirectory);
  const img = await FileSystem.readDirectoryAsync(imageDirectory)
  return Promise.all(result.map(async (fileName) => {
    const contact = await loadContact(fileName)
    const parsedContact = JSON.parse(contact)
    return {
      name: parsedContact.name,
      phoneNumber: parsedContact.phoneNumber,
      thumbnailPhoto: parsedContact.thumbnailPhoto
    };
  }));
};

export const editContact = async (oldName, newContactInfo) => {
  const newContactName = await regexName(newContactInfo.name)
  const oldContactName = await regexName(oldName)
  const fileName = `${contactDirectory}/${newContactName}`
  if (oldName !== newContactInfo.name) {
    await moveFile(`${contactDirectory}/${oldContactName}`, fileName)
    if (newContactInfo.thumbnailPhoto !== 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png') {
      await moveFile(`${imageDirectory}/${oldContactName}`, `${imageDirectory}/${newContactName}`)
    }
  }
  if (newContactInfo.thumbnailPhoto !== 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png') {
    newContactInfo.thumbnailPhoto = `${imageDirectory}/${newContactName}`
  }
  const newContactInfoString = JSON.stringify(newContactInfo)
  FileSystem.writeAsStringAsync(fileName, newContactInfoString)
}
