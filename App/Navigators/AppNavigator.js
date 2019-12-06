import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// Pages/Screen 
import LandingScreen from '../Containers/LandingScreen';
import Login from '../Containers/Login';
import News from '../Containers/News';
import AgendaScreen from '../Containers/Agenda';
import AboutUs from '../Containers/AboutUs';
import Program from '../Containers/Program';
import { Dimensions } from 'react-native';
import SideMenu from './Sidemenu';
import Notifications from '../Containers/Notifications';
import Chat from '../Containers/Chat/';
import Places from '../Containers/Places';
import Parameters from '../Containers/Parameters/';
import Contact from '../Containers/Contact/';
import Gallery from '../Containers/Gallery';

const screen = Dimensions.get("window");

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
        header : null
      }
    },
    AboutUs : {
      screen : AboutUs,
      navigationOptions:{
        header : null
      }
    },
    Program : {
      screen : Program,
      navigationOptions:{
        header : null
      }
    },
    Notifications : {
      screen : Notifications,
      navigationOptions:{
        header : null
      }
    },
    Chat : {
      screen : Chat,
      navigationOptions:{
        header : null
      }
    },
    Places : {
      screen : Places,
      navigationOptions:{
        header : null
      }
    },
    Parameters : {
      screen : Parameters,
      navigationOptions:{
        header : null
      }
    },
    Contact : {
      screen : Contact,
      navigationOptions:{
        header : null
      }
    },
    Gallery : {
      screen : Gallery,
      navigationOptions:{
        header : null
      }
    }
});

export const DrawerNavigator = createDrawerNavigator({
  MainNavigator,
},
{
  drawerWidth: screen.width,
  drawerPosition: 'right',
  drawerBackgroundColor: 'transparent',
  unmountInactiveRoutes: true,
  contentComponent: props => {
    return <SideMenu {...props} />
  }
}
);


const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;