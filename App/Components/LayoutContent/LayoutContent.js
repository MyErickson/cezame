import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text, Dimensions, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import SocialNetwork from '../SocialNetworkButtons';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");
import { Styles } from './styleLayoutContent'
export default class LayoutContent extends Component {
    render() {
        return (
            <View>
                <StatusBar translucent backgroundColor={Colors.rightColor} />
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0062EC','#07318D']} 
                    style={{ height: 150, paddingTop: 35 }}
                >
                    <Icon 
                        underlayColor="none"
                        name="ios-arrow-round-back" 
                        type='ionicon' 
                        onPress={ () => this.props.navigation.goBack() }
                        color={'white'}
                        containerStyle={{ position: "absolute", left: 35, top: 45, zIndex: 10 }}
                        hitSlop={{top: 10, bottom: 10, left: 0, right: 0}} 
                        size={40}
                    />
                    <Text style={Styles.title}>Cézame</Text>
                    <Icon 
                        name="account-circle" 
                        type='material-community' 
                        onPress={ () => console.log('profil') }
                        color={'white'}
                        containerStyle={{ position: "absolute", right: 25, top: 25 }}
                        size={20}
                    />
                </LinearGradient>
                <View style={Styles.containerChildrend} contentContainerStyle={{ paddingBottom: 50 }}>
                    {this.props.children}
                </View>
                <View style={{ width: "100%", backgroundColor: Colors.lightSecondary }}>
                    <SocialNetwork white />
                </View>
            </View>
        )
    }
}