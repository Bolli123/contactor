import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const AddButton = ({ onAdd }) => (
  <TouchableOpacity
    onPress={onAdd}
    style={styles.container}
  >
    <Entypo
      style={styles.icon}
      name="plus"
    />
  </TouchableOpacity>
)

AddButton.propTypes = {
  onAdd: PropTypes.func
}
AddButton.defaultProps = {
  onAdd: () => {

  }
}
export default AddButton;
