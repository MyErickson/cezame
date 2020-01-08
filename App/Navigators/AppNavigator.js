import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// Pages/Screen 
import LandingScreen from '../Containers/LandingScreen';
import Login from '../Containers/Login';
import News from '../Containers/News';
import AgendaScreen from '../Containers/Agenda';
import AboutUs from '../Containers/AboutUs';
import LegalNotice from '../Containers/LegalNotice';
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

const MainNavigator = createStackNavigator(
  {
    Home:  LandingScreen,
    Login:  Login,
    News : News,
    Agenda : AgendaScreen,
    AboutUs :  AboutUs,
    LegalNotice :  LegalNotice,
    Program :  Program,
    Notifications :  Notifications,
    Chat :  Chat,
    Places :  Places, 
    Parameters :  Parameters, 
    Contact :  Contact,
    Gallery :  Gallery,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    cardStyle:{ backgroundColor: 'transparent' },
  }
);

export const DrawerNavigator = createDrawerNavigator({
  MainNavigator,
},
{
  drawerWidth: screen.width,
  drawerPosition: 'right',
  drawerBackgroundColor: 'transparent',
  keyboardDismissMode:'none',
  unmountInactiveRoutes: true,
  contentComponent: props => {
    return <SideMenu {...props} />
  }
}
);


const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;