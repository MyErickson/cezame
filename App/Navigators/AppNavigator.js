import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// Pages/Screen 
import LandingScreen from '../Containers/LandingScreen/ContainerLandingScreen';
import ContainerLogin from '../Containers/Login/ContainerLogin';
import News from '../Containers/News';
import ContainerAgenda  from '../Containers/Agenda/ContainerAgenda';
import AboutUs from '../Containers/AboutUs';
import LegalNotice from '../Containers/LegalNotice';
import ContainerProgram from '../Containers/Program/ContainerProgram';
import { Dimensions } from 'react-native';
import ContainerSideMenu from './ContainerSideMenu ';
import ContainerNotifications from '../Containers/Notifications/ContainerNotif';
import ContainerChat  from '../Containers/Chat/ContainerChat';
import ContainerPlaces from '../Containers/Places/ContainerPlaces';
import ContainerParam from '../Containers/Parameters/ContainerParam';
import ContainerHotel from '../Containers/Hotel/ContainerHotel'
import ContainerContact from '../Containers/Contact/ContainerContact';
import CurrentImage from '../Containers/Gallery/CurrentImage/CurrentImage'
import ContainerGallery from '../Containers/Gallery/ContainerGallery';

const screen = Dimensions.get("window");

const MainNavigator = createStackNavigator(
  {
    Home:  LandingScreen,
    Login:  ContainerLogin,
    News : News,
    Agenda : ContainerAgenda ,
    AboutUs :  AboutUs,
    LegalNotice :  LegalNotice,
    Program :  ContainerProgram,
    Notifications :  ContainerNotifications,
    Chat :  ContainerChat ,
    Places :  ContainerPlaces, 
    Parameters :  ContainerParam, 
    Contact :  ContainerContact,
    Gallery :  ContainerGallery,
    Hotel: ContainerHotel,
    CurrentImage:CurrentImage

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
    return <ContainerSideMenu {...props} />
  }
}
);


const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;