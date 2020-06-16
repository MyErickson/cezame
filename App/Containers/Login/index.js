import React, { Component } from 'react';
import { Text,
  View,
  Modal, 
  Alert, 
  ActivityIndicator, 
  ImageBackground, 
  Dimensions, 
  KeyboardAvoidingView, StatusBar, ScrollView, Platform,TouchableHighlight} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button, Icon } from 'react-native-elements';

import Styles from './style';
import { config,  errorsMsg } from '../../Configs/General'
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
var jwtDecode = require('jwt-decode');

import AlertDialog from '../AlertDialog/AlertDialog';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


const screen = Dimensions.get("screen");


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          // inputs
          password          : "",
          login             : "",

          emailErrorMsg     : "",
          passwordErrorMsg  : "",
          passwordForgottenErrorMsg  : "",

          passwordForgotten : "",
          passwordForgottenValidate : false,

          // controls
          loaderConnexion   : false,
          isPasswordVisibility : false,
          modalVisible      : false,
          trip_User :undefined,

          alertVisible:false,
          messageAlert:"",
          style:false

        };
        this.input = { };
        // axios requests 
        this.Login = this.Login.bind(this);
        this.ResetPassword = this.ResetPassword.bind(this);

        // Display Controls 
        this.UpdateInputToState = this.UpdateInputToState.bind(this);
        this.ToogleModal = this.ToogleModal.bind(this);
    }




    //-----------------------------------//
    //------- Input Listener -----------//
    //---------------------------------//
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
       
        this.setState({ [name] :  event.nativeEvent.text})
    }

    //--------------------------------------//
    //---------- Display Control  ---------//
    //------------------------------------//
    ToogleLoader = () => {
      this.setState({loaderConnexion : !this.state.loaderConnexion});
    }

    TooglePasswordVisibility = () => {
      this.setState({isPasswordVisibility : !this.state.isPasswordVisibility});
    }

    ToogleModal = () => {
      this.setState({modalVisible: !this.state.modalVisible});
      
    }

    //-----------------------------------//
    //------- INPUT VALIDATOR ----------//
    //---------------------------------//

    PasswordValidator = (passwordToCheck) => {
      let password;

      // Password length check
      if(passwordToCheck.length > config.minLenPassword && passwordToCheck.length < config.maxLenPassword){
        password = passwordToCheck.toLowerCase();
        this.setState({passwordErrorMsg : ""});
      }
      else{
        this.setState({passwordErrorMsg : errorsMsg.passwordLen});
      }

      return password;
    }

    FormLoginValidator = async ( passwordToCheck) => {
      let password;

      try{

        password  = await this.PasswordValidator(passwordToCheck);

      }
      catch(error){
        console.log(error);
      }

      return {  password };
    }

    //--------------------------------//
    //------- MAIN ACTION -----------//
    //------------------------------//
    Login = async () => {
      const { login, password} = this.state
      try{
        // activate loader
        this.ToogleLoader();
        let validateInputs = await this.FormLoginValidator(password);
        // NavigationService.navigate('Program')
        if(login.trim() && validateInputs.password){

          axios.post("https://cezame-dev.digitalcube.fr/api/login_check",
              {    
                  username: login,
                  password: validateInputs.password
              })
            .then((response) => {

   
            // // handle success
            const {token }= response.data;
            const { responseConnection,getUsers ,callTrips,decode_Token ,get_Notif} = this.props
      
            responseConnection(token)
            this.StoreToken('jwt_auth', token);
            var decode = jwtDecode(token)

            console.log("TCL: Login -> Login -> decode", decode)
            decode_Token(decode)

            if(decode.trip_id){

              const data = new FormData
              data.token = token
              data.id = decode.id
              data.idTrip=decode.trip_id
                //request ask info Users
              getUsers(data)
              get_Notif(data)
              // request call program

              callTrips(data)

              AsyncStorage.getItem("jwt_auth").then((value) => {
                // remove loader
                this.ToogleLoader();
                NavigationService.navigate('Program')
              });
            }else{

              this.ToogleLoader();
              this.setState({
                alertVisible:true,
                style:true,
                messageAlert:"En tant que V.I.P, vous avez le privilège de vous connecter sur le Web",
              })
              return

            }  

          })
          .catch((error) => {
          console.log("TCL: Login -> Login -> error-> error", error.response)
            //handle error
            
            this.ToogleLoader();
            this.setState({
              alertVisible:true,
              style:false,
              messageAlert:"Le mot de passe ou l'identifiant est invalide.",
            })
          });
        }
        else{
          // deactivate loader
          this.ToogleLoader();
        }
      }
      catch(error){
        console.log("TCL: Login -> Login -> error", error)

      }
    }

    ResetPassword = async () => {
      const { passwordForgotten } = this.state
      console.log("Login -> ResetPassword -> login", passwordForgotten)
      try{
       

        if(passwordForgotten.trim()){
  
          axios.post( 'https://cezame-dev.digitalcube.fr/api/forgot-password',
          {
            username:passwordForgotten
          })
          .then((res) => {
          
          this.setState({
            alertVisible:true,
            style:true,
            passwordForgotten:"",
            messageAlert:res.data.message,
          })

            this.ToogleModal();   
        
          })
          .catch((err) => {
            this.setState({
              alertVisible:true,
              style:false,
              messageAlert:"L'identifiant n'est pas dans notre base de données",
            })
          });
          
        }
      }
      catch(error){
        this.setState({
          alertVisible:true,
          style:false,
          messageAlert:"Le champ n'a pas été rempli",
        })
      }
    }
  
    //--------------------------------------------//
    //------- TO STORE INTO THE REDUX -----------//
    //------------------------------------------//
    StoreToken = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        // saving error
        console.log(error)
      }
    }


  inputFocus=(id)=>{  
       this.input[id].focus()
  }

  closeAlert=()=>{
      this.setState({alertVisible:!this.state.alertVisible})
  }




    render(){

        // loader
        const { messageAlert, style , alertVisible } = this.state
        let loaderConnexion;
     
    
        if (this.state.loaderConnexion){
          loaderConnexion =  <ActivityIndicator size="large" color="#0000ff" />;
        }

        // password eye icon
        let eyeIcon;
        if (this.state.isPasswordVisibility == false){
          // Visibility = true 
          eyeIcon =  <Icon name='eye-slash' type="font-awesome" size={18} color='#969696' onPress={this.TooglePasswordVisibility}/>;
        }
        else{
          // Visibility = false
          eyeIcon = <Icon name='eye' type="font-awesome" size={18} color='#969696' onPress={this.TooglePasswordVisibility}/>;
        }
        const keybord = Platform.OS === "ios" ? hp("-5%") : hp("-55%")

     

        return(
       
            <View style={{flex:1}}>
                 <KeyboardAvoidingView  behavior="position" enabled  keyboardVerticalOffset={keybord} style={{flex:1}} >  
              <StatusBar translucent backgroundColor={Colors.rightColor} />
                <ScrollView 
                style={{ marginHorizontal: 0  }}
          
             
                >
                <ImageBackground 
                  source={Images.bgLogin}
                 imageStyle={{ resizeMode: 'stretch'}}
                 style={{width: screen.width, height: screen.height-281}}
                >
            
                  <Icon 
                     underlayColor="none"
                    name="ios-arrow-round-back" 
                    type='ionicon' 
                    color={'white'}
                    onPress={ () => this.props.navigation.goBack()}
                    containerStyle={{ position: "absolute", left: 30, top: 25 }}
                    size={55}
                  />
             
                  <Text style={{color: "white", fontSize: 32, textTransform: "uppercase", position: "absolute", top: (screen.height/2)-90, left: 60 }}>Bienvenue</Text>
                </ImageBackground>
                {loaderConnexion}
               
                <ScrollView style={{ marginHorizontal: 50,marginTop:-20}}
                  keyboardDismissMode='on-drag'
                  keyboardShouldPersistTaps='handled'
                  contentInsetAdjustmentBehavior="never"
                >
                  <Input
                    name='login' 
                    label='Identifiant'
                    placeholder='Identifiant'
                    errorStyle={{ color: 'red' }}
                    errorMessage={this.state.emailErrorMsg} 
                    value={this.state.email} 
                    onChange={this.UpdateInputToState}
                    placeholderTextColor="#CCCCCC"
                    labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0,marginTop: 10,  fontSize: 15 ,}}
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6" }}
                    inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    onSubmitEditing={() => { this.inputFocus("password") }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  <Input 
                    ref={ text => this.input["password"] = text}
                    name="password"
                    secureTextEntry={!this.state.isPasswordVisibility}
                    label="Mot de passe"
                    placeholder='•••••••••'
                    errorStyle={{ color: 'red' }}
                    errorMessage={this.state.passwordErrorMsg} 
                    value={this.state.password} 
                    onChange={this.UpdateInputToState} 
                    rightIcon={eyeIcon}
                    placeholderTextColor="#CCCCCC"
                    labelStyle={{ fontSize: 15, marginTop: 5, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0, marginTop: 10, fontSize: 15,  }}
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6" }}
                    inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    onSubmitEditing={this.Login}
                    returnKeyType="send"
                  />
                  <Button 
                    buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.lightPrimary, }} 
                    containerStyle= {{ marginTop: 25, marginBottom: 0 }} 
                    onPress={this.Login} 
                    title="Connexion" 
                  />
                  <Button  
                    title="Mot de passe oublié ?"
                    onPress={this.ToogleModal} 
                    type="clear"
                  />
                </ScrollView>
               
                </ScrollView>
         

              {/* Modal */}
        
                <Modal
                style={Styles.modalContainer}
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert(`Touch sur "annuler" pour revenir à la page précèdente. `);
                  }}>
                  <View>
                    <View>
                      <Text style={Styles.modalTitle}>
                        Saisissez votre Identifiant, nous vous enverrons un email de récupération de mot de passe
                      </Text>
                      <Input
                       inputContainerStyle={{color:"black"}}
                        name='passwordForgotten' 
                        label='Identifiant'
                        
                        errorStyle={{ color: 'red' }}
                        errorMessage={ this.state.passwordForgottenErrorMsg } 
                        value={this.state.passwordForgotten} 
                        onChange={this.UpdateInputToState}
                      />
                      {/* buttons modal */}
                      <View style={Styles.modalButtonContainer}>
                        <Button
                          type='outline'
                          iconRight={{
                            name : '',
                            size : 14,
                            color : 'white'
                          }}
                          title="Annuler"
                          onPress={() => {
                            this.ToogleModal(!this.state.modalVisible);
                          }}
                        />
                        <Button
                          iconRight={{
                            name: "send",
                            size: 15,
                            color: "white"
                          }}
                          title="Envoyer"
                          onPress={() => {
                            this.ResetPassword();
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
                </KeyboardAvoidingView>
                        
                <AlertDialog
                alertVisible={alertVisible}
                closeAlert={this.closeAlert}
                messageAlert={messageAlert}
                style={style}
                />

            </View>
       
        );
    }
}