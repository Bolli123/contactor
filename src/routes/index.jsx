import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../views/main';
import Details from '../views/details';
import EditButton from '../components/editbutton';


const StackNavigator = createStackNavigator({
  Main,
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
      headerRight:( <EditButton /> )
    },
  },
});

export default createAppContainer(StackNavigator);
