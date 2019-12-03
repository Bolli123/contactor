import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/contactlist';
import AddModal from '../../components/AddModal';
import data from '../../resources/data.json'
import styles from '../../views/main/styles'
import { saveContact, getAllContacts, deleteContact, saveImage, getImagePath } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';

class Main extends React.Component {
  state = {
    contacts: [],
    filteredContacts: [],
    selectedContacts: [],
    isAddModalOpen: false,
    loadingContacts: false,
    newContactName: '',
    newPhoto: '',
    newPhoneNumber: '',
    }
  async componentDidMount() {
    await this._fetchItems()
  }

  async _fetchItems() {
    this.setState({loadingContacts: true})
    const contacts = await getAllContacts()
    this.setState({ contacts: contacts, loadingContacts: false, filteredContacts: contacts })
  }
  onContactLongPress(name) {
    const { selectedContacts } = this.state;
    if (selectedContacts.indexOf(name) !== -1) {
      // contact is already in the list
      this.setState({
        selectedContacts: selectedContacts.filter(contact => contact !== name)
      });
    } else {
      //add contact
      this.setState({
        selectedContacts: [ ...selectedContacts, name ]
      });
    }
  }
  async takePhoto() {
    const photo = await takePhoto();
    if (photo.length > 0) {
      this.setState({newPhoto: photo})
    }
  }
  async selectFromCameraRoll() {
    const photo = await selectFromCameraRoll();
    if (photo.length > 0) {
      this.setState({newPhoto: photo})
    }
}
deleteSelected() {
  this.setState({loadingContacts: true})
  const { selectedContacts, contacts } = this.state
  const retContacts = []
  for (const [index, value] of contacts.entries()) {
    if (!selectedContacts.includes(value.name)) {
        retContacts.push(value)
      }
    else {
      deleteContact(value.name)
    }
  }
  this.setState({
    contacts: retContacts,
    filteredContacts: retContacts,
    selectedContacts: [],
    loadingContacts: false
  })
  }

  setContactName(name) {
      this.setState({newContactName: name})
  }

  setContactPhoneNumber(phoneNumber) {
    this.setState({newPhoneNumber: phoneNumber})
  }

  async addContact() {
    this.setState({loadingContacts: true})
    const { newContactName, newPhoto, contacts, newPhoneNumber, filteredContacts } = this.state
    if (newContactName === '' || newPhoto === '' || newPhoneNumber === '') {
      return
    }
    await saveImage(newPhoto, newContactName)
    const photo = getImagePath(newContactName)
    const newContactObject = {
      name: newContactName,
      phoneNumber: newPhoneNumber,
      thumbnailPhoto: photo
    }
    const newContact = await saveContact(newContactObject)
    this.setState({
      contacts: [ ...contacts, newContactObject ],
      filteredContacts: [ ...filteredContacts, newContactObject ],
      isAddModalOpen: false,
      newPhoto: '',
      newContactName: '',
      newPhoneNumber: '',
      loadContact: false
    })
  }

  displayCaption() {
    const { selectedContacts } = this.state;
    if (selectedContacts.length == 0) {
      return;
    }
    let itemCaption = 'contacts';
    if (selectedContacts.length === 1) {
      itemCaption = 'contact'
    }
    return <Text style={styles.selectedText}> {selectedContacts.length} {itemCaption} selected </Text>
  }

  searchFilterFunction = text => {
    const { contacts } = this.state;
    this.setState({
      value: text,
    });
    const filteredOutput = contacts.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      filteredContacts: filteredOutput,
    });
  };

  call = () => {
    const contactNumber = {
      number: '8970038',
      prompt: false
    }
    call(contactNumber).catch(console.error);
  }

  render() {
    const { selectedContacts, filteredContacts, isAddModalOpen, value } = this.state;
    return (
      <View style={{ flex: 1}}>
        <SearchBar
          placeholder="Search"
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
        <Toolbar
          hasSelectedContacts={selectedContacts.length > 0}
          onAdd={() => this.setState({ isAddModalOpen: true})}
          onRemove={() => this.deleteSelected()}
          pagename ={'Contacts'}
        />
        <ContactList
          onLongPress={(name) => this.onContactLongPress(name)}
          contacts={ filteredContacts }
          selectedContacts={selectedContacts}/>
          <View style={styles.block_counter}>
          {this.displayCaption()}
          </View>
        <AddModal
          isOpen={isAddModalOpen}
          closeModal={() => this.setState({
            isAddModalOpen: false ,
            newPhoto: '',
            newContactName: ''
          })}
          takePhoto={() => this.takePhoto()}
          selectFromCameraRoll={() => this.selectFromCameraRoll()}
          addContact={() => this.addContact()}
          contactName={(name) => this.setContactName(name)}
          contactNumber={(number) => this.setContactPhoneNumber(number)}
         />
      </View>
    )
  }
}

export default Main; // Returns a connected component
