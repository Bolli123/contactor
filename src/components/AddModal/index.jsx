import React from 'react';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Button, Text } from 'react-native';
import TextInput from '../textinput'
import Modal from '../Modal';
import styles from './styles';

const AddModal = ({
  isOpen, closeModal, takePhoto, selectFromCameraRoll, submitContact, newContactName, newContactNumber, contactName, contactNumber, newPhoto
}) => (
  <Modal
    isOpen={isOpen}
    closeModal={closeModal}
  >
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
          <Entypo
            style={styles.icon}
            name="camera"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={selectFromCameraRoll}>
          <Entypo
            style={styles.icon}
            name="image"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <Button
          title="Submit"
          onPress={() => submitContact()}
          style={styles.action}
        />
        <Button
          color="#d9534f"
          title="Cancel"
          onPress={closeModal}
          style={styles.action}
        />
      </View>
    </View>
  </Modal>
);

AddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  takePhoto: PropTypes.func.isRequired,
  selectFromCameraRoll: PropTypes.func.isRequired,
  submitContact: PropTypes.func.isRequired,
  newContactName: PropTypes.func.isRequired,
  newContactNumber: PropTypes.func.isRequired,
  newPhoto: PropTypes.string,
  contactName: PropTypes.string,
  contactNumber: PropTypes.string
}

AddModal.defaultProps = {
  contactName: '',
  contactNumber: '',
  newPhoto: ''
}
export default AddModal;
