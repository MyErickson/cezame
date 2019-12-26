import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Dimensions, BackHandler, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import UploadImage from '../../Containers/Gallery/UploadImage';
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
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor={'transparent'} />
                {this.props.allScreenHeader == true ? (
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.leftColor, Colors.rightColor]} 
                        style={{ 
                            width: screen.width,
                            height: screen.height-8, 
                            paddingTop: 50, 
                        }}
                    />
                ) : (
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.leftColor, Colors.rightColor]} 
                        style={{ 
                            width: this.props.roundHeader == true ? screen.width+150 : screen.width,
                            height: this.props.roundHeader == true ? screen.width+120 : 120, 
                            paddingTop: 50, 
                            borderRadius: this.props.roundHeader == true ? screen.width+120 : 0, 
                            marginTop: this.props.roundHeader == true ? -(screen.width-(screen.width/2)+50 ) : 0,
                            marginLeft: this.props.roundHeader == true ? -50 : 0, 
                        }}
                    />
                ) }
                
                <View style={{ position: 'absolute', top: 20, width: screen.width, paddingHorizontal: 25, marginTop: 45, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        {this.props.return && (
                            <Icon 
                                name="arrow-back" 
                                color="white" 
                                containerStyle={{  zIndex: 100 }} 
                                onPress={ () => this.props.navigation.goBack() }
                            />
                        )}
                    </View>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 18, marginLeft: 45 }}>
                        {this.props.title}
                    </Text>
                    {this.props.chat == true ? (
                        <View style={[AppStyles.style.flex, {  alignItems: "center"}]}>
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
                    ): (
                        <View style={[AppStyles.style.flex, { alignItems: "center"}]}>
                            <Icon 
                                name="notifications" 
                                color='white'
                                onPress={() =>  NavigationService.navigate('Notifications')}
                            />
                            <TouchableOpacity 
                                style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: Colors.dark, marginLeft: 15 }} 
                                onPress={() => NavigationService.navigate("Parameters")} 
                            >
                                <Image source={Images.devProfil} style={{ width: 35, height: 35, borderRadius: 35 }} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View 
                    style={{
                        width: screen.width, 
                        height: this.props.chat == true ? screen.height-70 : screen.height-135, 
                        backgroundColor: (this.props.roundHeader == true || this.props.allScreenHeader == true ) ? "transparent" : Colors.white, 
                        paddingTop: this.props.noPaddingTop == true ? 0 : 15, 
                        position: (this.props.roundHeader == true || this.props.allScreenHeader == true ) ? "absolute" : "relative",
                        top: (this.props.roundHeader == true || this.props.allScreenHeader == true ) ? ( this.props.allScreenHeader == true ? 120 : -(screen.width-530 )) : 0,
                    }} 
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    {this.props.children}
                </View>
                {!this.props.chat && (
                    <View style={{ 
                        width: screen.width, 
                        backgroundColor: Colors.lightSecondary, 
                        flexDirection: "row", justifyContent: "space-between", 
                        paddingVertical: 15, paddingHorizontal: 15, 
                        position: this.props.roundHeader == true ? "absolute" : "relative",
                        bottom: 0
                    }}>
                        {this.props.gallery && (
                            <UploadImage />
                        )}
                        <View style={AppStyles.style.flex}>
                            <Icon 
                                name="home"
                                color="white"
                                type="font-awesome"
                                containerStyle={{ marginRight: 15 }}
                                onPress={() => NavigationService.navigate("Program")}
                            />
                            <Icon 
                                name="comments"
                                color="white"
                                type="font-awesome"
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