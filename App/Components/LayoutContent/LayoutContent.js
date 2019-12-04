import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import SocialNetwork from '../SocialNetworkButtons';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");

export default class LayoutContent extends Component {
    render() {
        return (
            <View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0062EC','#07318D']} 
                    style={{ height: 120 }}
                >
                    <Icon 
                        name="ios-arrow-round-back" 
                        type='ionicon' 
                        onPress={ () => this.props.navigation.goBack() }
                        color={'white'}
                        containerStyle={{ position: "absolute", left: 25, top: 15, zIndex: 10 }}
                        size={40}
                    />
                    <Text style={{ marginTop: 15, textAlign: "center", color: "white", textTransform: "uppercase", fontSize: 25, fontWeight: "bold" }}>Cézame</Text>
                    <Icon 
                        name="account-circle" 
                        type='material-community' 
                        onPress={ () => console.log('profil') }
                        color={'white'}
                        containerStyle={{ position: "absolute", right: 25, top: 25 }}
                        size={20}
                    />
                </LinearGradient>
                <View style={{width: '100%', height: screen.height-120, backgroundColor: "white", borderRadius: 50, marginTop: -50, paddingHorizontal: 35, paddingTop: 30 }} contentContainerStyle={{ paddingBottom: 50 }}>
                    {this.props.children}
                </View>
                <View style={{ width: "100%", backgroundColor: Colors.lightSecondary }}>
                    <SocialNetwork white />
                </View>
            </View>
        )
    }
}