import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';
import Toolbar from '../../components/Toolbar';
import AddModal from '../../components/AddModal';
import styles from '../../views/details/styles';
import { Entypo } from '@expo/vector-icons';
import EditButton from '../../components/editbutton';
import { editContact, saveImage, getImagePath } from '../../services/fileService'
import { takePhoto, selectFromCameraRoll } from '../../services/imageService'


class Details extends React.Component {
  state = {
    thumbnailPhoto: null,
    name: '',
    phoneNumber: '',
    editModalOpen: false,
    newContactName: '',
    newPhoneNumber: '',
    newPhoto: ''
  }

  async componentDidMount() {
    const { navigation } = this.props
    const thumbnailPhoto = navigation.getParam('thumbnailPhoto', '')
    const name = navigation.getParam('name', '')
    const phoneNumber = navigation.getParam('phoneNumber', '')
    this.setState({
      thumbnailPhoto: thumbnailPhoto,
      name: name,
      phoneNumber: phoneNumber,
      newContactName: name,
      newPhoneNumber: phoneNumber,
      newPhoto: thumbnailPhoto
    })
    this.props.navigation.setParams({ toggleModal: this._toggleModal });
    }

  setContactName(name) {
      this.setState({newContactName: name})
  }

  setContactPhoneNumber(phoneNumber) {
    this.setState({newPhoneNumber: phoneNumber})
  }

  async editContact() {
    const { name, newContactName, newPhoneNumber, newPhoto, thumbnailPhoto } = this.state
    if (newContactName === '' || newPhoneNumber === '' || newPhoto === '') {
      return
    }
    let photo = newPhoto
    if (thumbnailPhoto !== newPhoto) {
      await saveImage(newPhoto, name)
      photo = getImagePath(name)
    }
    const newContact = {
      name: newContactName,
      phoneNumber: newPhoneNumber,
      thumbnailPhoto: photo
    }
    await editContact(name, newContact)
    this.setState({
      name: newContactName,
      phoneNumber: newPhoneNumber,
      thumbnailPhoto: newPhoto,
      editModalOpen: false
    })
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

  _toggleModal = () => {
    const { editModalOpen } = this.state
    this.setState({ editModalOpen: !editModalOpen})
  }

  call = () => {
    const { phoneNumber } = this.state;
    const contactNumber = {
      number: phoneNumber,
      prompt: false,
    }
    call(contactNumber).catch(console.error);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#6ea6ff'
      },
      headerTintColor: '#fff',
      headerTitle: 'Details',
      headerRight: () => (
        <EditButton
          onEdit={navigation.getParam('toggleModal')}
        />
      ),
    }
  }

  render() {
    const { thumbnailPhoto, name, phoneNumber, editModalOpen, newPhoto } = this.state;
    return (
      <View style={{ flex: 1}}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: thumbnailPhoto }}
          />
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={this.call} style={styles.numberContainer}>
            <Entypo
            style={styles.icon}
            name="phone"
            />
            <Text style={styles.phoneNumber}>
              {phoneNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <AddModal
          isOpen={editModalOpen}
          closeModal={() => this.setState({
            editModalOpen: false ,
            newPhoto: thumbnailPhoto,
            newContactName: name,
            newContactNumber: phoneNumber
          })}
          takePhoto={() => this.takePhoto()}
          selectFromCameraRoll={() => this.selectFromCameraRoll()}
          submitContact={() => this.editContact()}
          newContactName={(name) => this.setContactName(name)}
          newContactNumber={(number) => this.setContactPhoneNumber(number)}
          contactName={name}
          contactNumber={phoneNumber}
          newPhoto={newPhoto}
         />
      </View>
    )
  }
}

export default Details;
