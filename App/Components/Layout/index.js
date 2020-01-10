import React, { Component, Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Dimensions, BackHandler, Image, StatusBar, TouchableOpacity ,ScrollView } from 'react-native';
import { Icon,Header } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import UploadImage from '../../Containers/Gallery/UploadImage';
import { Styles } from './styleLayout'
const screen = Dimensions.get("window");
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
export default class Layout extends Component {
    
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack()
            return true;
        });
    }

    render() {
        const { allScreenHeader ,tokenConnection} = this.props
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor={Colors.rightColor} />
              
                <Header
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff',fontSize:18,fontWeight: 'bold' } }}
                    rightComponent={
                        tokenConnection && 
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
                            containerStyle={{ marginRight: 5 }}
                            onPress={ () => { this.props.navigation.toggleDrawer() } }
                        />
                    </View>  }
              
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [Colors.leftColor, Colors.rightColor],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 },
                    }}
                />

             {/* <Fragment> 
       
                
                    <View style={[Styles.header,{ width: screen.width},tokenConnection && {justifyContent: "space-around"}]}>
                        <View style={!tokenConnection && {marginRight: wp("17%")}}>
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
                        {tokenConnection && 
                        <Fragment>
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
                        </Fragment> }
                    </View> 
            
             </Fragment>  */}
                
                <View 
                    style={{
                        flex:1, 
                       
                    }} 
        
                >
                    {this.props.children}
                </View>
                {/* {tokenConnection && 
                <Fragment>
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
                </Fragment> } */}
                  
            </View>
        )
    }
}