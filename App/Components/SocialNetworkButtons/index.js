import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from  'react-native-elements';

import  Styles  from './style';

export default class SocialNetwork extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.text}> textInComponent </Text>
                <View>

                </View>
            </View>
        )
    }
}
