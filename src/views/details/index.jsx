import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';
import Toolbar from '../../components/Toolbar';
import AddModal from '../../components/AddModal';
import styles from '../../views/details/styles';
import { Entypo } from '@expo/vector-icons';
import EditButton from '../../components/editbutton';


class Details extends React.Component {
  state = {
    thumbnailPhoto: null,
    name: '',
    phoneNumber: '',
    editModalOpen: false,

  }
  async componentDidMount() {
    const { navigation } = this.props
    const thumbnailPhoto = navigation.getParam('thumbnailPhoto', '')
    const name = navigation.getParam('name', '')
    const phoneNumber = navigation.getParam('phoneNumber', '')
    this.setState({thumbnailPhoto: thumbnailPhoto})
    this.setState({name: name})
    this.setState({phoneNumber: phoneNumber})
    this.props.navigation.setParams({ toggleModal: this._toggleModal });
  }

  _toggleModal = () => {
    const { editModalOpen } = this.state
    console.log(editModalOpen)
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
      headerTitle: 'Details',
      headerRight: () => (
        <EditButton
          onPress={navigation.getParam('toggleModal')}
        />
      ),
    };
  };
  render() {
    const { thumbnailPhoto, name, phoneNumber, editModalOpen } = this.state;
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
            newPhoto: '',
            newContactName: ''
          })}
          takePhoto={() => this.takePhoto()}
          selectFromCameraRoll={() => this.selectFromCameraRoll()}
          addContact={() => this.addContact()}
          newContactName={(name) => this.setContactName(name)}
          newContactNumber={(number) => this.setContactPhoneNumber(number)}
          contactName={name}
          contactNumber={phoneNumber}
         />
      </View>
    )
  }
}

export default Details;
