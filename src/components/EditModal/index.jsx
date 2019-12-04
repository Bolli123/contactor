import React from 'react';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Button } from 'react-native';
import TextInput from '../textinput'
import Modal from '../Modal';
import styles from './styles';

const AddModal = ({
  isOpen, closeModal, takePhoto, selectFromCameraRoll, addContact, contactName, contactNumber
}) => (
  <Modal
    isOpen={isOpen}
    closeModal={closeModal}
  >
    <TextInput
      userInput={contactName}
      placeholder="Contact Name..."
    />
    <TextInput
      userInput={contactNumber}
      placeholder="Contact Number..."
    />
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={takePhoto}>
        <Entypo
          style={styles.icon}
          name="camera"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={selectFromCameraRoll}>
        <Entypo
          style={styles.icon}
          name="image"
        />
      </TouchableOpacity>
    </View>
    <Button
      title="Add Contact"
      onPress={() => addContact()}
    />
  </Modal>
);

AddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  takePhoto: PropTypes.func.isRequired,
  selectFromCameraRoll: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  contactName: PropTypes.func.isRequired,
  contactNumber: PropTypes.func.isRequired
}
export default AddModal;
