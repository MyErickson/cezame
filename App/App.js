import React from 'react';
import { Provider } from "react-redux";
import store from './store/';
import {StatusBar} from 'react-native';
import AppNavigator from './Navigators/AppNavigator';
import NavigationService from './Services/NavigationService';

export default function App() {
  return (
    <Provider store={store}>
    <AppNavigator ref={(navigatorRef) => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}/>
     </Provider>
  );
};
