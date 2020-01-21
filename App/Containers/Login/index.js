import React, { Component } from 'react';
import { Text,
  View,
  Modal, 
  Alert, 
  ActivityIndicator, 
  ImageBackground, 
  Dimensions, 
  KeyboardAvoidingView, StatusBar, ScrollView, Platform,TouchableHighlight } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button, Icon } from 'react-native-elements';

import Styles from './style';
import { config, patternEmail, errorsMsg } from '../../Configs/General'
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
var jwtDecode = require('jwt-decode');

import AlertDialog from '../AlertDialog/AlertDialog';
import AlertAdmin from '../AlertDialog/AlertAdmin';
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
          email             : "",
          password          : "",

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

    EmailValidator = (emailToCheck, emailInputName) => {
      let email;

      // Email
      if (emailToCheck){
        if(patternEmail.test(emailToCheck.trim())){
          email = emailToCheck.toLowerCase();
          this.setState({[emailInputName] : ""});
          
        }
        else{
          this.setState({[emailInputName] : errorsMsg.emailInvalide});
        }
      }
      else{
        this.setState({[emailInputName] : errorsMsg.emptyFiled });
      }

      return (email);
    }

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

    FormLoginValidator = async (emailToCheck, passwordToCheck) => {
      let email;
      let password;

      try{
        email     = await this.EmailValidator(emailToCheck, "emailErrorMsg");
        password  = await this.PasswordValidator(passwordToCheck);

      }
      catch(error){
        console.log(error);
      }

      return { email, password };
    }

    //--------------------------------//
    //------- MAIN ACTION -----------//
    //------------------------------//
    Login = async () => {
      const { email, password} = this.state
      try{
        // activate loader
        this.ToogleLoader();
        let validateInputs = await this.FormLoginValidator(email,password);
        // NavigationService.navigate('Program')
        if(validateInputs.email && validateInputs.password){

          axios.post("https://cezame-dev.digitalcube.fr/api/login_check",
              {    
                  username: validateInputs.email,
                  password: validateInputs.password
              })
            .then((response) => {

   
            // // handle success
            const {token }= response.data;
            const { responseConnection,getUsers ,callTrips,decode_Token } = this.props
      
            responseConnection(token)
            this.StoreToken('jwt_auth', token);
            var decode = jwtDecode(token)
            decode_Token(decode)
            if(decode.roles[0] !== "ROLE_USER"){
              console.log("TCL: Login -> Login -> decode", decode)
              this.ToogleLoader();
              this.setState({
                alertVisible:true,
                messageAlert:"En tant que V.I.P, vous avez le privilège de vous connecter sur le Web",
              })
              
              return
            }
            const data = new FormData
            data.token = token
            data.id = decode.id
            data.idTrip=decode.trip_id
            //request ask info Users
            getUsers(data)

            // request call program

            callTrips(data)

            AsyncStorage.getItem("jwt_auth").then((value) => {
              // remove loader
              this.ToogleLoader();
              NavigationService.navigate('Program')
            });
          


          })
          .catch((error) => {
          console.log("TCL: Login -> Login -> error-> error", error.response)
            //handle error
            
            this.ToogleLoader();
            this.setState({
              alertVisible:true,
              messageAlert:"Le mot de passe ou l'email est invalide.",
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
      try{
        const email = await this.EmailValidator(this.state.passwordForgotten, "passwordForgottenErrorMsg");

        if(email){
  
          axios.post( 'https://cezame-dev.digitalcube.fr/api/forgot-password',
          {
            email:email
          })
          .then((res) => {
            console.log(res);
            this.ToogleModal();
          })
          .catch((err) => {
            this.setState({
              alertVisible:true,
              messageAlert:"Ce mail n'est pas dans notre base de données",
            })
          });
          
        }
      }
      catch(error){
        console.log(error);
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
                showsVerticalScrollIndicator = {false}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps="handled"
                contentInsetAdjustmentBehavior="never"
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
                    onPress={ () => this.props.navigation.goBack() }
                    color={'white'}
                    containerStyle={{ position: "absolute", left: 25, top: 25 }}
                    size={55}
                  />
                  <Text style={{color: "white", fontSize: 32, textTransform: "uppercase", position: "absolute", top: (screen.height/2)-90, left: 60 }}>Bienvenue</Text>
                </ImageBackground>
                {loaderConnexion}
               
                <ScrollView style={{ marginHorizontal: 50,marginTop:-20}}>
                  <Input
                    name='email' 
                    label='Identifiant'
                    placeholder='email@adress.com'
                    errorStyle={{ color: 'red' }}
                    errorMessage={this.state.emailErrorMsg} 
                    value={this.state.email} 
                    onChange={this.UpdateInputToState}
                    placeholderTextColor="#CCCCCC"
                    labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0, marginTop: 15, fontSize: 15 ,}}
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
                    labelStyle={{ fontSize: 15, marginTop: 15, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0, marginTop: 15, fontSize: 15,  }}
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
                        Saisissez votre adresse email, nous vous enverrons un email de récupération de mot de passe
                      </Text>
                      <Input
                       inputContainerStyle={{color:"black"}}
                        name='passwordForgotten' 
                        label='Votre email'
                        placeholder='email@my_email.com'
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