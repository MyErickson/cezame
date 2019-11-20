import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Styles from './style';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
          email: '',
          password: '',
          loginValidate : false,

          emailForgotten : '',
          emailForgottenValidate : false,

          loaderConnexion : false,
          passwordVisibility : false,
          modalVisible : false
        }

        this.UpdateInputToState = this.UpdateInputToState.bind(this);
        this.Login = this.Login.bind(this);

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
      this.setState({passwordVisibility : !this.state.passwordVisibility});
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

    Login = () => {
        // activate loader
        this.ToogleLoader();

        let bodyFormData = new FormData();
        
        bodyFormData.append("login", "bruno.cox");
        bodyFormData.append("pass", 123456);

        // bodyFormData.append("login", this.state.email);
        // bodyFormData.append("pass", this.state.password);

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

    ResetPassword = () => {
      const email = this.state.emailForgotten;
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
        if (this.state.passwordVisibility == false){
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
                  errorMessage='' 
                  value={this.state.email} 
                  onChange={this.UpdateInputToState}
                />
                <Input 
                  name="password"
                  secureTextEntry={!this.state.passwordVisibility}
                  label="Mot de passe"
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
                    <View style={{padding: 15, }}>
                      
                      <Text style={{ marginBottom : 50, fontSize: 22 }}>
                        Saisissez votre addresse email, nous  vous enverons un email de récupération de mot de passe 
                      </Text>
                      <Input
                        style={{marginBottom : 50}}
                        name='forgottenPassword' 
                        label='Votre email'
                        placeholder='email@my_email.com'
                        errorStyle={{ color: 'red' }}
                        errorMessage='' 
                        value={this.state.email} 
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
                            this.ToogleModal(!this.state.modalVisible);
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