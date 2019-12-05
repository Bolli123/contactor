import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const DeleteButton = ({ onDelete, selected }) => (
  <TouchableOpacity
    onPress={onDelete}
    style={styles.container}
  >
    <Text style={styles.text}>Delete selected ({ selected })</Text>
  </TouchableOpacity>
)

DeleteButton.propTypes = {
  onDelete: PropTypes.func,
  selected: PropTypes.string
}
DeleteButton.defaultProps = {
  onDelete: () => {

  },
  selected: ''
}
export default DeleteButton;
