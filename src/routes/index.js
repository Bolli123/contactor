import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../views/main';
import Tasks from '../views/tasks';
import Lists from '../views/lists';


const StackNavigator = createStackNavigator({
  Main,
  Lists,
  Tasks,
});

export default createAppContainer(StackNavigator);
