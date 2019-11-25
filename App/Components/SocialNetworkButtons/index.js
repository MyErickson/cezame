import React, { Component } from 'react';
import { View, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Icon } from  'react-native-elements';

import  Styles  from './style';
import  Colors  from '../../Themes/Colors'

export default class SocialNetwork extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <TouchableNativeFeedback>
                    <Icon
                        raised
                        name='facebook'
                        type='font-awesome'
                        color={Colors.facebook}
                        onPress={() => console.log('facebook')} 
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised
                        name='twitter'
                        type='font-awesome'
                        color={Colors.twitter}
                        onPress={() => console.log('twitter')} 
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised
                        name='linkedin'
                        type='font-awesome'
                        color={Colors.linkedin}
                        onPress={() => console.log('linkedin')} 
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised
                        name='instagram'
                        type='font-awesome'
                        color={Colors.instagram}
                        onPress={() => console.log('instagram')} 
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised
                        name='youtube-play'
                        type='font-awesome'
                        color={Colors.youtube}
                        onPress={() => console.log('youtube-play')} 
                    />
                </TouchableNativeFeedback>
            </View>
        )
    }
}
