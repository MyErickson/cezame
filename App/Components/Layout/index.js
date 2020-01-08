import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Dimensions, BackHandler, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import UploadImage from '../../Containers/Gallery/UploadImage';
import { Styles } from './styleLayout'
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
                <StatusBar translucent backgroundColor={Colors.rightColor} />
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
                            height: this.props.roundHeader == true ? screen.width+120 : 80, 
                            borderRadius: this.props.roundHeader == true ? screen.width+120 : 0, 
                            marginTop: this.props.roundHeader == true ? -(screen.width-(screen.width/2)+50 ) : 0,
                            marginLeft: this.props.roundHeader == true ? -50 : 0, 
                            flex:1

                        
                        }}
                    />
                ) }
                
                <View style={[Styles.header,{ width: screen.width}]}>
                    <View>
                        {this.props.return && (
                            <Icon 
                                underlayColor="none"
                                name="arrow-back" 
                                color="white" 
                                containerStyle={{  zIndex: 100 }} 
                                onPress={ () => this.props.navigation.goBack() }
                            />
                        )}
                    </View>
                    <Text style={Styles.title}>
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
                                style={Styles.iconParam} 
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
                        paddingTop:  0, 
                        position: (this.props.roundHeader == true || this.props.allScreenHeader == true ) ? "absolute" : "relative",
                        top: (this.props.roundHeader == true || this.props.allScreenHeader == true ) ? ( this.props.allScreenHeader == true ? 120 : -(screen.width-530 )) : 0,
                    }} 
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    {this.props.children}
                </View>
                {!this.props.chat && (
                    <View style={[Styles.containerMenu,{position: this.props.roundHeader == true ? "absolute" : "relative",}]}>
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