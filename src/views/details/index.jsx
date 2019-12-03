import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';
import Toolbar from '../../components/Toolbar';
import AddModal from '../../components/AddModal';
import styles from '../../views/details/styles';
import { Entypo } from '@expo/vector-icons';

class Details extends React.Component {
  state = {
    thumbnailPhoto: null,
    name: '',
    phoneNumber: '',
    isAddModalOpen: false,
  }
  async componentDidMount() {
    const { navigation } = this.props
    const thumbnailPhoto = navigation.getParam('thumbnailPhoto', '')
    const name = navigation.getParam('name', '')
    const phoneNumber = navigation.getParam('phoneNumber', '')
    this.setState({thumbnailPhoto: thumbnailPhoto})
    this.setState({name: name})
    this.setState({phoneNumber: phoneNumber})
  }


  displayCaption() {
    const { selectedLists } = this.state;
    if (selectedLists.length == 0) { return; }

    let itemCaption = 'lists';
    if (selectedLists.length === 1) {
      itemCaption = 'list'
    }
    return <Text style={styles.selectedText}> {selectedLists.length} {itemCaption} selected </Text>
  }

  call = () => {
    const { phoneNumber } = this.state;
    const contactNumber = {
      number: phoneNumber,
      prompt: false,
    }
    call(contactNumber).catch(console.error);
  }

  render() {
    const { thumbnailPhoto, name, phoneNumber, isAddModalOpen } = this.state;
    return (
      <View style={{ flex: 1}}>
        <Toolbar
          hasSelectedContacts={true}
          onAdd={() => this.setState({ isAddModalOpen: true})}
          onRemove={() => this.deleteSelected()}
          pagename ={'details'}
        />
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
            {phoneNumber}</Text>
          </TouchableOpacity>
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

export default Details;
