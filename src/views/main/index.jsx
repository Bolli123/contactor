import React from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/contactlist';
import AddModal from '../../components/AddModal';
import AddButton from '../../components/addbutton'
import DeleteButton from '../../components/deletebutton'
import SyncButton from '../../components/syncbutton'
import data from '../../resources/data.json'
import styles from '../../views/main/styles'
import { saveContact, getAllContacts, deleteContact, saveImage, getImagePath, loadImage } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { initializeAllContacts } from '../../services/contactsService';
import { connect } from 'react-redux'
import { actionSetContacts } from '../../actions/contactActions'

class Main extends React.Component {
  state = {
    contacts: this.props.contacts,
    filteredContacts: this.props.contacts,
    selectedContacts: [],
    isAddModalOpen: false,
    loadingContacts: false,
    newContactName: '',
    newPhoto: '',
    newPhoneNumber: '',
    }
  async componentDidMount() {
    this.props.navigation.setParams({ toggleModal: this._toggleModal });
    this.props.navigation.setParams({ syncContacts: this.syncContacts });
    await this._fetchItems()
  }
  _toggleModal = () => {
    const { isAddModalOpen } = this.state
    this.setState({ isAddModalOpen: !isAddModalOpen})
  }

  async _fetchItems() {
    this.setState({loadingContacts: true})
    const contacts = await getAllContacts()
    const { actionSetContacts } = this.props
    actionSetContacts(contacts)
    this.setState({ loadingContacts: false, contacts: this.props.contacts, filteredContacts: this.props.contacts })
  }

  syncContacts = async () => {
    this.setState({loadingContacts: true})
    await initializeAllContacts()
    const contacts = await getAllContacts()
    const { actionSetContacts } = this.props
    actionSetContacts(contacts)
    this.setState({ contacts: this.props.contacts, loadingContacts: false, filteredContacts: this.props.contacts })
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
  const { selectedContacts, contacts, filteredContacts } = this.state
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
    const photo = await loadImage(newContactName)
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
    } else {
      return <DeleteButton selected={selectedContacts.length} onDelete={() => this.deleteSelected()}/>
    }
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

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#6ea6ff',
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      },
      headerTintColor: '#fff',
      headerTitle: 'Contacts',
      headerRight: () => (
        <AddButton
          onAdd={navigation.getParam('toggleModal')}
        />
      ),
      headerLeft: () => (
        <SyncButton
          onSync={navigation.getParam('syncContacts')}
          title="Sync Contacts"
        />
      ),
    }
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
          submitContact={() => this.addContact()}
          newContactName={(name) => this.setContactName(name)}
          newContactNumber={(number) => this.setContactPhoneNumber(number)}
         />
      </View>
    )
  }
}

const mapStateToProps = reduxStoreState => {
  return {contacts: reduxStoreState.contact}
}

export default connect(mapStateToProps, { actionSetContacts })(Main); // Returns a connected component
