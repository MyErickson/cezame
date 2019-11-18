import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Pages/Screen 
import LandingScreen from '../Containers/LandingScreen';
import Login from '../Containers/Login';
import News from '../Containers/News';

const MainNavigator = createStackNavigator({
    Home: {
      screen: LandingScreen,
      navigationOptions: {
        header : null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        
      }
    },
    News : {
      screen: News
    }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;