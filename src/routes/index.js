import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../views/main';
import Details from '../views/details';


const StackNavigator = createStackNavigator({
  Main,
  Details
});

export default createAppContainer(StackNavigator);
