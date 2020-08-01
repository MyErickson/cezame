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
import axios from 'axios'
import validator from "validator"


export default class LandingScreen extends Component {
  
    state ={
        refreshing:false,
        socialNetwork:undefined
    }
    componentDidMount(){
        const { getSocialNetwork } =this.props
        getSocialNetwork && getSocialNetwork()
      
    }

    static  getDerivedStateFromProps(props,state){

        const {social_Network } = props
      

        if(social_Network){
            state.socialNetwork = social_Network
        } else{
            
            return null
        } 
       
     }

    goToScreen=async(value )=>{
        const { title , navigateName , dataNavigate } = value
        const {navigation , decode_Token,initialize_State,getUsers,get_Notif,callTrips ,infoUser} = this.props;
        const token = await AsyncStorage.getItem("jwt_auth")
        console.log("LandingScreen -> goToScreen -> token ", token )
        const  decode = token && jwtDecode(token)
        const validToken = token && validator.isJWT(token)
        console.log("LandingScreen -> goToScreen ->  validToken ",  validToken )
      
       
 

        if(token && title === "Accès client" && decode.trip_id && decode.username){
            if(validToken){
                decode_Token(decode)

              const data = {}
              data.token = token
              data.id = decode.id
              data.idPlanning=infoUser?.planning?.id
              data.idTrip=decode.trip_id
                getUsers(data)
                get_Notif(data)
                // request call program
  
                callTrips(data)
               
                this.check(decode,token)
                navigation.navigate("Program")
            }else {
                await AsyncStorage.removeItem('jwt_auth')
                initialize_State()
                navigation.navigate(navigateName, dataNavigate && dataNavigate)
               
            }
           
        }else{

            navigation.navigate(navigateName, dataNavigate && dataNavigate)
        }
       
    }

    check =(decode,token)=>{
        const {responseConnection,getUsers,decode_Token} = this.props;
            //decotoken for redux
            decode_Token(decode)
            let data = new FormData

            data.token = token
            data.id = decode.id
            data.idTrip=decode.trip_id


            //request ask info Users
            responseConnection(token)
            getUsers(data)
    }

 


    onRefresh =async ()=>{ 
 
       const { callTrips, getSocialNetwork } =this.props
      
        this.setState({
            refreshing:true
        });
        
        getSocialNetwork()

        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)

      
    }

    render() {
   
        const { refreshing , socialNetwork} =this.state
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
                        <SocialNetworkButtons socialNetwork={socialNetwork} />
                    </View>
             
          </View>
        )
    }
}
