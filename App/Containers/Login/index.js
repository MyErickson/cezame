import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Styles from './style';
import { patternEmail, errorsMsg } from '../../Configs/General'
import { validate } from '@babel/types';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          // inputs
          email             : "",
          password          : "",

          emailErrorMsg     : "",
          passwordErrorMsg  : "", 

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

    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    ToogleLoader = () => {
      this.setState({loaderConnexion : !this.state.loaderConnexion});
    }

    TooglePasswordVisibility = () => {
      this.setState({isPasswordVisibility : !this.state.isPasswordVisibility});
    }

    ToogleModal = () => {
      this.setState({modalVisible: !this.state.modalVisible});
      
    }

    StoreToken = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          // saving error
          console.log(error)
        }
    }


    FormLoginValidator = (emailToCheck, passwordToCheck) => {
      let email;
      let password;

      // Password 
      if(passwordToCheck.length > 6 && passwordToCheck.length < 22){
        password = passwordToCheck;
        this.setState({passwordErrorMsg : ""});
      }
      else{
        this.setState({passwordErrorMsg : errorsMsg.passwordLen});
      }

      // Email
      if (emailToCheck){
        if(patternEmail.test(emailToCheck.trim())){
          email = emailToCheck;
          this.setState({emailErrorMsg : ""});
        }
        else{
          this.setState({emailErrorMsg : errorsMsg.emailInvalide});
        }
      }
      else{
        this.setState({emailErrorMsg : errorsMsg.emptyFiled });
      }
      
      return { email, password };
    }

    Login = async () => {
      try{
        // activate loader
        this.ToogleLoader();
        let validate = await this.FormLoginValidator(this.state.email, this.state.password);

        if(validate.email && validate.password){
          let bodyFormData = new FormData();
          bodyFormData.append("login", validate.email);
          bodyFormData.append("pass", validate.password);
          // a décommenter si on ne veux pas taper le login/password
          //bodyFormData.append("login", "bruno.cox");
          //bodyFormData.append("pass", 123456);
  
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
          })
          .catch((error) => {
            //handle error
            console.log(error);
            this.ToogleLoader();
          });
        }
        else{
          console.log("ca passe pas")
          // deactivate loader
          this.ToogleLoader();
        }
      }
      catch(error){
        console.log(error)
      }
    }

    ResetPassword = () => {
      const email = this.state.passwordForgotten;
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
          eyeIcon =  <Icon name='eye-slash' size={28} color='black' onPress={this.TooglePasswordVisibility}/>;
        }
        else{
          // Visibility = false
          eyeIcon = <Icon name='eye' size={28} color='black' onPress={this.TooglePasswordVisibility}/>;
        }

        return(
            <View>
              {loaderConnexion}
              <View>
                <Input
                  name='email' 
                  label='Identifiant'
                  placeholder='email@my_email.com'
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.emailErrorMsg} 
                  value={this.state.email} 
                  onChange={this.UpdateInputToState}
                />
                <Input 
                  name="password"
                  secureTextEntry={!this.state.isPasswordVisibility}
                  label="Mot de passe"
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.passwordErrorMsg} 
                  value={this.state.password} 
                  onChange={this.UpdateInputToState} 
                  rightIcon={eyeIcon}
                />
                <Button  
                  title="Connexion" 
                  onPress={this.Login} 
                  type="solid"
                />
                <Button  
                  title="Mot de passe oublié ?" 
                  onPress={this.ToogleModal} 
                  type="clear"
                />
              </View>




              {/* Modal */}
              <View style={{marginTop: 22}}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 20}}>
                    <View style={{padding: 15}}>
                      <Text style={{ marginBottom : 50, fontSize: 22 }}>
                        Saisissez votre addresse email, nous  vous enverons un email de récupération de mot de passe 
                      </Text>
                      <Input
                        style={{marginBottom : 50}}
                        name='passwordForgotten' 
                        label='Votre email'
                        placeholder='email@my_email.com'
                        errorStyle={{ color: 'red' }}
                        errorMessage='' 
                        value={this.state.passwordForgotten} 
                        onChange={this.UpdateInputToState}
                      />
                      {/* buttons modal */}
                      <View style={{flex : 1, flexDirection: "row", minHeight: 100, justifyContent: "space-around", marginTop: 50}}>
                        <Button
                          style={{flex : 1 }}
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
                          style={{flex : 1}}
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