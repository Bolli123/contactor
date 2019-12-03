import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../views/main';
import Details from '../views/details';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';


const StackNavigator = createStackNavigator({
  Main,
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
      headerRight: (
        <TouchableOpacity style={styles.container}>
          <Text style={styles.right}>Edit</Text>
          <Entypo
          style={styles.icon}
          name="edit"
          />
        </TouchableOpacity>
      )
    },
  },
});

export default createAppContainer(StackNavigator);
