import React from 'react';
import { View, Text } from 'react-native';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/contactlist';
import AddModal from '../../components/AddModal';
import styles from '../../views/main/styles'
import { saveContact, getAllContacts } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { connect } from 'react-redux'
import { actionAddContact, actionDeleteContacts } from '../../actions/contactActions'

class Main extends React.Component {
  state = {
    contacts: this.data,
    selectedContacts: [],
    isAddModalOpen: false,
    loadingContacts: false,
    newContactName: '',
    newContactId: 0,
    newPhoto: '',
    newPhoneNumber: ''
  }
  async componentDidMount() {
    const { contacts } = this.state
    const newId = contacts[contacts.length-1].id + 1
    this.setState( {newContactId: newId} )
    await this._fetchItems()
  }

  async _fetchItems() {
    this.setState({loadingContacts: true})
    const contacts = await getAllContacts()
    this.setState({ contacts, loadingContacts: false})
  }
  onContactLongPress(id) {
    const { selectedContacts } = this.state;
    if (selectedContacts.indexOf(id) !== -1) {
      // contact is already in the list
      this.setState({
        selectedContacts: selectedContacts.filter(contact => contact !== id)
      });
    } else {
      //add contact
      this.setState({
        selectedContacts: [ ...selectedContacts, id ]
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
  const { selectedContacts, contacts} = this.state
  const retContacts = []
  for (const [index, value] of contacts.entries()) {
  if (!selectedContacts.includes(value.id)) {
      retContacts.push(value)
    }
  }
  this.setState({
    contacts: retContacts,
    selectedContacts: []
  })
  const { actionDeleteContacts } = this.props;
  actionDeleteContacts(retContacts)
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
      thumbnailPhoto: newPhoto,
      phoneNumber: newPhoneNumber
    }
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
    const { actionAddContact } = this.props;
    actionAddContact(newContactId, newContactName, newPhoneNumber, newPhoto)
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
  render() {
    const { selectedContacts, contacts, isAddModalOpen } = this.state;
    return (
      <View style={{ flex: 1}}>
        <Toolbar
          hasSelectedContacts={selectedContacts.length > 0}
          onAdd={() => this.setState({ isAddModalOpen: true})}
          onRemove={() => this.deleteSelected()}
          pagename ={'Contacts'}
        />
        <ContactList
          onLongPress={(id) => this.onContactLongPress(id)}
          contacts={ contacts }
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

const mapStateToProps = reduxStoreState => {
  return {contacts: reduxStoreState.contact}
}

export default connect(mapStateToProps, { actionAddContact, actionDeleteContacts })(Main); // Returns a connected component
