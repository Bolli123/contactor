import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const SyncButton = ({ onSync }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onSync}
  >
    <Entypo
      style={styles.icon}
      name="ccw"
    />
    <Text style={styles.right}>Sync Contacts</Text>
  </TouchableOpacity>
)

SyncButton.propTypes = {
  onSync: PropTypes.func
}

SyncButton.defaultProps = {
  onSync: () => {

  }
}
export default SyncButton;
