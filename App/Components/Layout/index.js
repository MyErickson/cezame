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
      state={
        tokenConnection:undefined
      }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack()
            return true;
        });
    }


    render() {
        const { tokenConnection,title} = this.props
 
        console.log("TCL: Layout -> render -> tokenConnection", tokenConnection)
      
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor={Colors.rightColor} />
              
                <Header
                containerStyle={{marginBottom:-0.2}}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() ,underlayColor:"none"}}
                    centerComponent={{ text: title, style: { color: '#fff',fontSize:18,fontWeight: 'bold' } }}
                    rightComponent={
                        tokenConnection ?   this.props.chat == true ?
                    <View style={[AppStyles.style.flex, {  alignItems: "center"}]}>
                          <TouchableOpacity 
                         
                          >
                        <Icon 
                            underlayColor="none"
                            name="home"
                            color="white"
                            containerStyle={{ marginRight: 15 }}
                            onPress={() => NavigationService.navigate("Program")}
                        />
                        <Icon
                            underlayColor="none"
                            name="menu"
                            color="white"
                            containerStyle={{ marginRight: 5 }}
                            onPress={ () => { this.props.navigation.toggleDrawer() } }
                        /> 
                        </TouchableOpacity>
                    </View> 
                        : 
                    <View style={[AppStyles.style.flex, { alignItems: "center"}]}>
                        <Icon 
                            underlayColor="none"
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
                    :null
                 }
              
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [Colors.leftColor, Colors.rightColor],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 },
                    }}
                />

  
                <View style={{flex:1}} >
                    {this.props.children}
                </View>


                {tokenConnection && 
                <Fragment>
                    {!this.props.chat && (
                        <View style={[Styles.containerMenu]}>
                            {this.props.gallery && (
                                <UploadImage />
                            )}
                            <View style={AppStyles.style.flex}>
                                <Icon 
                                    underlayColor="none"
                                    name="home"
                                    color="white"
                                    type="font-awesome"
                                    containerStyle={{ marginRight: 20 }}
                                    onPress={() => NavigationService.navigate("Program")}
                                />
                                <Icon 
                                    underlayColor="none"
                                    name="comments"
                                    color="white"
                                    type="font-awesome"
                                    onPress={() => NavigationService.navigate("Chat")}
                                />  
                            </View>
                            <TouchableOpacity >
                                <Icon
                                underlayColor="none"
                                    name="menu"
                                    color="white"  
                                    onPress={ () => { this.props.navigation.toggleDrawer() } }
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </Fragment> }
      

            </View>
        )
    }
}