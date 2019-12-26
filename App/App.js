import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './Navigators/AppNavigator';
import NavigationService from './Services/NavigationService';

export default function App() {
  return (
    <AppNavigator ref={(navigatorRef) => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}/>
  );
};
