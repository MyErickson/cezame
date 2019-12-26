import React, { Component } from 'react';
import { Text, View, Modal, Alert, ActivityIndicator, ImageBackground, Dimensions, KeyboardAvoidingView, StatusBar, ScrollView } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button, Icon } from 'react-native-elements';

import Styles from './style';
import { config, patternEmail, errorsMsg } from '../../Configs/General'
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';

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
          modalVisible      : false
        }

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
      try{
        // activate loader
        this.ToogleLoader();
        let validateInputs = await this.FormLoginValidator(this.state.email, this.state.password);
        NavigationService.navigate('Program')
        if(validateInputs.email && validateInputs.password){
          let bodyFormData = new FormData();
          bodyFormData.append("login", validateInputs.email);
          bodyFormData.append("pass", validateInputs.password);

          // a décommenter si on ne veux pas taper le login/password
          // bodyFormData.append("login", "bruno.cox");
          // bodyFormData.append("pass", 123456);
  
          axios({
            url: "https://cezame-dev.digitalcube.fr/api/login",
            method : 'POST',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then((response) => {
            //handle success
            const token = response.data.token;
            this.StoreToken('jwt_auth', token);
            AsyncStorage.getItem("jwt_auth").then((value) => {
              // remove loader
              this.ToogleLoader();
            });
            NavigationService.navigate('Program')
          })
          .catch((error) => {
            //handle error
            console.log(error);
            this.setState({ emailErrorMsg : errorsMsg.invalidLogin, passwordErrorMsg : errorsMsg.invalidLogin });
            this.ToogleLoader();
          });
        }
        else{
          // deactivate loader
          this.ToogleLoader();
        }
      }
      catch(error){
        console.log(error)
      }
    }

    ResetPassword = async () => {
      try{
        const email = await this.EmailValidator(this.state.passwordForgotten, "passwordForgottenErrorMsg");

        if(email){
          let bodyFormData = new FormData();
          bodyFormData.append("login", email);
  
          axios({
            url : 'https://cezame-dev.digitalcube.fr/api/forgot-password',
            method : 'POST',
            data : bodyFormData,
            headers : { "Content-Type" : "multipart/form-data"}
          })
          .then((res) => {
            console.log(res);
            this.ToogleModal();
          })
          .catch((err) => console.log(err));
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

    render(){
        // loader
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

        return(
            <View>
              <StatusBar translucent backgroundColor={'transparent'} />
              <KeyboardAvoidingView  behavior="position" enabled>
                <ImageBackground 
                  source={Images.bgLogin}
                  style={{width: screen.width, height: screen.height-231}}
                >
                  <Icon 
                    name="ios-arrow-round-back" 
                    type='ionicon' 
                    onPress={ () => this.props.navigation.goBack() }
                    color={'white'}
                    containerStyle={{ position: "absolute", left: 25, top: 25 }}
                    size={55}
                  />
                  <Text style={{color: "white", fontSize: 32, textTransform: "uppercase", position: "absolute", top: (screen.height/2)-50, left: 60 }}>Bienvenue</Text>
                </ImageBackground>
                {loaderConnexion}
              
                <ScrollView style={{ marginHorizontal: 50, marginTop: -40, height: 300 }}>
                  <Input
                    name='email' 
                    label='Identifiant'
                    placeholder='email@adress.com'
                    errorStyle={{ color: 'red' }}
                    errorMessage={this.state.emailErrorMsg} 
                    value={this.state.email} 
                    onChange={this.UpdateInputToState}
                    labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0, marginTop: 15, fontSize: 15 }}
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6" }}
                    inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                  />
                  <Input 
                    name="password"
                    secureTextEntry={!this.state.isPasswordVisibility}
                    label="Mot de passe"
                    placeholder='•••••••••'
                    errorStyle={{ color: 'red' }}
                    errorMessage={this.state.passwordErrorMsg} 
                    value={this.state.password} 
                    onChange={this.UpdateInputToState} 
                    rightIcon={eyeIcon}
                    labelStyle={{ fontSize: 15, marginTop: 15, color: Colors.dark, fontWeight: "normal" }}
                    inputStyle={{ padding: 0, marginTop: 15, fontSize: 15,  }}
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6" }}
                    inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
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
              </KeyboardAvoidingView>

              {/* Modal */}
              <View style={Styles.modalContainer}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View>
                    <View>
                      <Text style={Styles.modalTitle}>
                        Saisissez votre adresse email, nous vous enverrons un email de récupération de mot de passe
                      </Text>
                      <Input
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
              </View>
            </View>
        );
    }
}