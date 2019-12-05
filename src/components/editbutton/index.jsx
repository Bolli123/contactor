import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const EditButton = ({ onEdit }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onEdit}
  >
    <Text style={styles.right}>Edit</Text>
    <Entypo
      style={styles.icon}
      name="edit"
    />
  </TouchableOpacity>
)

EditButton.propTypes = {
  onEdit: PropTypes.func
}

EditButton.defaultProps = {
  onEdit: () => {

  }
}
export default EditButton;
