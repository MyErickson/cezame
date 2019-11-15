import { createAppContainer, createStackNavigator } from 'react-navigation';

import LandingScreen from '../Containers/LandingScreen';
import Login from '../Containers/Login';

const StackNavigator = createStackNavigator(
    {
        LandingScreen : LandingScreen,
        Login         : Login
    }
)

export default createAppContainer(StackNavigator);