import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

const EditButton = () => (

  <TouchableOpacity style={styles.container}>
    <Text style={styles.right}>Edit</Text>
    <Entypo
      style={styles.icon}
      name="edit"
    />
  </TouchableOpacity>
)
export default EditButton;
