/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry , YellowBox} from 'react-native';
import App from './App/App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Remote debugger']);
AppRegistry.registerComponent(appName, () => App);
