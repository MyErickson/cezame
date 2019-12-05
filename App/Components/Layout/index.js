import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text, Dimensions, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import SocialNetwork from '../SocialNetworkButtons';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
const screen = Dimensions.get("window");

export default class Layout extends Component {
    
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack()
            return true;
        });
    }

    render() {
        return (
            <View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0062EC','#07318D']} 
                    style={{ height: 120, paddingTop: 50 }}
                >
                    {this.props.return && 
                        (
                            <Icon 
                                name="arrow-back" 
                                color="white" 
                                containerStyle={{ position:"absolute", top: 70, left: 35, zIndex: 100 }} 
                                onPress={ () => this.props.navigation.goBack() }
                            />
                        )
                    }
                    <Text style={{ marginTop: 18, textAlign: "center", color: "white", fontSize: 18 }}>
                        {this.props.title}
                    </Text>
                    {this.props.chat == true ? (
                        <View style={[AppStyles.style.flex, { position:"absolute", top: 68, right: 25, alignItems: "center"}]}>
                            <Icon 
                                name="home"
                                color="white"
                                containerStyle={{ marginRight: 15 }}
                                onPress={() => NavigationService.navigate("Program")}
                            />
                            <Icon
                                name="menu"
                                color="white"
                                onPress={ () => { this.props.navigation.toggleDrawer() } }
                            />
                        </View>
                    )
                    : 
                    (
                        <View style={[AppStyles.style.flex, { position:"absolute", top: 60, right: 25, alignItems: "center"}]}>
                            <Icon 
                                name="notifications" 
                                color='white'
                                onPress={() =>  NavigationService.navigate('Notifications')}
                            />
                            <View style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: Colors.dark, marginLeft: 15 }}></View>
                        </View>
                    )
                    }
                </LinearGradient>
                <View 
                    style={{
                        width: '100%', height: this.props.chat == true ? screen.height-70 : screen.height-135, 
                        backgroundColor: Colors.white, 
                        paddingTop: this.props.noPaddingTop == true ? 0 : 15, 
                    }} 
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    {this.props.children}
                </View>
                {!this.props.chat && (
                    <View style={{ width: "100%", backgroundColor: Colors.lightSecondary, flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={AppStyles.style.flex}>
                            <Icon 
                                name="home"
                                color="white"
                                containerStyle={{ marginRight: 15 }}
                                onPress={() => NavigationService.navigate("Program")}
                            />
                            <Icon 
                                name="chat"
                                color="white"
                                type="entypo"
                                onPress={() => NavigationService.navigate("Chat")}
                            />  
                        </View>
                        
                        <Icon
                            name="menu"
                            color="white"
                            onPress={ () => { this.props.navigation.toggleDrawer() } }
                        />
                    </View>
                )}
            </View>
        )
    }
}