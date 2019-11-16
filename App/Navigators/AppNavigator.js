import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from '../Containers/LandingScreen';

const MainNavigator = createStackNavigator({
    Home: {
      screen: LandingScreen,
      navigationOptions: {
        header : null
      }
    }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;