import React, { Component } from 'react';
import { View } from 'react-native';
import AppNavigator from '../../Navigators';

class RootScreen extends Component {
    render(){
        return(
            <View>
                <AppNavigator />
            </View>
        )
    }
}

export default RootScreen;