import React from 'react';
import NativeModal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const Modal = ({
  isOpen, closeModal, children
}) => (
  <NativeModal
    isVisible={isOpen}
    hasBackdrop
    onRequestClose={closeModal}
    onBackButtonPress={closeModal}
    onSwipeComplete={closeModal}
    swipeDirection={['up', 'down']}
    style={styles.modal}
  >
    <View style={styles.body}>
      {children}
    </View>
  </NativeModal>
);


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};


export default Modal;
