import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import SocialNetwork from '../SocialNetworkButtons';
import Colors from '../../Themes/Colors';

export default class LayoutContent extends Component {
    render() {
        console.log(this.props)
        return (
            <View>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <Icon 
                        name="ios-arrow-round-back" 
                        type='ionicon' 
                        onPress={ () => this.props.navigation.goBack() }
                        color={'white'}
                        containerStyle={{ position: "absolute", left: 25, top: 25 }}
                        size={55}
                    />
                    <Text>Cézame</Text>
                    <View>
                        <Icon 
                            name="account-circle" 
                            type='material-community' 
                            onPress={ () => this.props.navigation.goBack() }
                            color={'white'}
                            containerStyle={{ position: "absolute", left: 25, top: 25 }}
                            size={55}
                        />
                    </View>
                </LinearGradient>
                <ScrollView style={{ flex: 1, width: '100%', height: 500 }} contentContainerStyle={{ paddingBottom: 50 }}>
                    {this.props.children}
                </ScrollView>
                <View style={{ width: "100%", backgroundColor: Colors.secondary }}>
                    <SocialNetwork />
                </View>
            </View>
        )
    }
}