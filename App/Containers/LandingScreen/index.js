import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar,Text,ScrollView ,RefreshControl } from 'react-native';
import Styles from './StyleLandingScreen';
import SocialNetworkButtons from '../../Components/SocialNetworkButtons';
import Colors from '../../Themes/Colors';
import { Button } from 'react-native-elements';
import Images from '../../Themes/Images';
import { dataLanding } from '../../Configs/General'
var jwtDecode = require('jwt-decode');
import AsyncStorage from '@react-native-community/async-storage';

export default class LandingScreen extends Component {
  
        state ={
            refreshing:false
        }

    goToScreen=async(value )=>{
        const { title , navigateName , dataNavigate } = value
        const {responseConnection,navigation,getUsers,decode_Token} = this.props;
        const token = await AsyncStorage.getItem("jwt_auth")
  
        if(token && title === "Accès client"){
            let decode = jwtDecode(token)
            //decotoken for redux
            decode_Token(decode)
            let data = new FormData

            data.token = token
            data.id = decode.id
            data.idTrip=decode.trip_id


            //request ask info Users
            responseConnection(token)
            getUsers(data)
            navigation.navigate("Program")
        }else{
            navigation.navigate(navigateName, dataNavigate && dataNavigate)
        }
       
    }

    onRefresh =async ()=>{ 
 
       const { callTrips } =this.props
       const token = await AsyncStorage.getItem("jwt_auth")
        this.setState({
            refreshing:true
        });
        
        token && callTrips()

        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)

      
    }

    render() {
   
        const { refreshing} =this.state
        return (

            <View style={{ flex: 1 , backgroundColor: Colors.generalBackground }}>
                     
                <StatusBar translucent backgroundColor={Colors.rightColor} />
                <ScrollView 
                    style={{ marginHorizontal: 0 , zIndex:1  }}
                    showsVerticalScrollIndicator = {false}
                    contentInsetAdjustmentBehavior="automatic"
                   
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        progressViewOffset={20}
                        onRefresh={()=>this.onRefresh()} 
                        colors={["#0000ff"]}
                        tintColor="#0000ff"
                        titleColor="#0000ff"
                        title="actualise"/>
                      }
                >
                <View style={Styles.imageContainer}>
                    <Image
                        style={{ width: 153, height: 187 }}
                        source={Images.logo}
                    />
                </View>
            <View style={Styles.buttonContainer}>
                    {dataLanding.map((value,key)=>{
                        const { backgroundColor , title } = value

                        return  (
                                <Button 
                                key={key}
                                buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: backgroundColor}} 
                                containerStyle= {{ paddingVertical: 5 }} 
                                onPress={() => this.goToScreen(value)} 
                                title={title}
                            />
                        )
                   })}
               </View>
               </ScrollView>
               <ImageBackground source={Images.bgImage} style={Styles.backgroundLanding}>
                 
                </ImageBackground> 
                <View style={{  bottom: 15, left : 0, right : 0}}>
                        <SocialNetworkButtons />
                    </View>
             
          </View>
        )
    }
}
