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
                        raised={this.props.white ? false : true }
                        name='facebook'
                        type='font-awesome'
                        color={this.props.white ? "white" : Colors.facebook}
                        onPress={() => console.log('facebook')} 
                        containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                        size={18}
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised={this.props.white ? false : true }
                        name='twitter'
                        type='font-awesome'
                        color={this.props.white ? "white" : Colors.twitter}
                        onPress={() => console.log('twitter')} 
                        containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                        size={18}
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised={this.props.white ? false : true }
                        name='linkedin'
                        type='font-awesome'
                        color={this.props.white ? "white" : Colors.linkedin}
                        onPress={() => console.log('linkedin')} 
                        containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                        size={18}
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised={this.props.white ? false : true }
                        name='instagram'
                        type='font-awesome'
                        color={this.props.white ? "white" : Colors.instagram}
                        onPress={() => console.log('instagram')} 
                        containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                        size={18}
                    />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <Icon
                        raised={this.props.white ? false : true }
                        name='youtube-play'
                        type='font-awesome'
                        color={this.props.white ? "white" : Colors.youtube}
                        onPress={() => console.log('youtube-play')} 
                        containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                        size={18}
                    />
                </TouchableNativeFeedback>
            </View>
        )
    }
}
