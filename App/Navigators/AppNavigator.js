import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Pages/Screen 
import LandingScreen from '../Containers/LandingScreen';
import Login from '../Containers/Login';
import News from '../Containers/News';
import AgendaScreen from '../Containers/Agenda';

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
        header : null
      }
    },
    News : {
      screen: News,
      navigationOptions: {
        header : null
      }
    },
    Agenda : {
      screen : AgendaScreen,
      navigationOptions:{
        title  : 'Agenda',
      }
    }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;