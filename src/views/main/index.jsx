import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/contactlist';
import AddModal from '../../components/AddModal';
import data from '../../resources/data.json'
import styles from '../../views/main/styles'
import { saveContact, getAllContacts, deleteContact, saveImage } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';

class Main extends React.Component {
  state = {
    contacts: data.contacts,
    filteredContacts: data.contacts,
    selectedContacts: [],
    isAddModalOpen: false,
    loadingContacts: false,
    newContactName: '',
    newContactId: 0,
    newPhoto: '',
    newPhoneNumber: '',
    }
  async componentDidMount() {
    const { contacts } = this.state
    setState ({
      filteredContacts: contacts,
    })
    const newId = contacts[contacts.length-1].id + 1
    this.setState( {newContactId: newId} )
    await this._fetchItems()
  }

  async _fetchItems() {
    this.setState({loadingContacts: true})
    const contacts = await getAllContacts()
    console.log(contacts)
    this.setState({ contacts: contacts, loadingContacts: false})
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
    const { newContactName, newPhoto, newContactId, contacts, newPhoneNumber } = this.state
    if (newContactName === '' || newPhoto === '' || newPhoneNumber === '') {
      return
    }
    const newContactObject = {
      id: newContactId,
      name: newContactName,
      phoneNumber: newPhoneNumber,
      thumbnailPhoto: newPhoto
    }
    const photo = await saveImage(newPhoto)
    const newContact = await saveContact(newContactObject)
    this.setState({
      contacts: [ ...contacts, newContactObject ],
      isAddModalOpen: false,
      newPhoto: '',
      newContactName: '',
      newPhoneNumber: '',
      loadContact: false
    })
    this.setState({ newContactId: newContactId + 1 })
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
