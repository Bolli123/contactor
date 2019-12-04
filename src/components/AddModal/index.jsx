import React from 'react';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Button } from 'react-native';
import TextInput from '../textinput'
import Modal from '../Modal';
import styles from './styles';

const AddModal = ({
  isOpen, closeModal, takePhoto, selectFromCameraRoll, addContact, newContactName, newContactNumber, contactName, contactNumber
}) => (
  <Modal
    isOpen={isOpen}
    closeModal={closeModal}
  >
    <TextInput
      userInput={newContactName}
      placeholder="Contact Name..."
      defaultValue={contactName}
    />
    <TextInput
      userInput={newContactNumber}
      placeholder="Contact Number..."
      defaultValue={contactNumber}
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
  newContactName: PropTypes.func.isRequired,
  newContactNumber: PropTypes.func.isRequired,
  contactName: PropTypes.string,
  contactNumber: PropTypes.string
}

AddModal.defaultProps = {
  contactName: '',
  contactNumber: ''
}
export default AddModal;
