import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

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
          loaderConnexion : false,
          passwordVisibility : false,
        }

        this.UpdateInputToState = this.UpdateInputToState.bind(this);
        this.Login = this.Login.bind(this);

    }

    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    toogleLoader = () => {
      this.setState({loaderConnexion : !this.state.loaderConnexion});
    }

    tooglePasswordVisibility = () => {
      this.setState({passwordVisibility : !this.state.passwordVisibility});
    }

    storeToken = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          // saving error
          console.log(error)
        }
    }

    Login = () => {
        // activate loader
        this.toogleLoader();

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
          this.storeToken('jwt_auth', token);
          AsyncStorage.getItem("jwt_auth").then((value) => {
            console.log(value)
            // remove loader
            this.toogleLoader();
          });
        })
        .catch((error) => {
          //handle error
          console.log(error);
          this.toogleLoader();
        });
    }

    render(){

        // loader
        let loaderConnexion;
        if (this.state.loaderConnexion){
          loaderConnexion =  <ActivityIndicator size="large" color="#0000ff" />;
        }

        let eyeIcon;
        if (!this.state.passwordVisibility){
          // Visibility = true 
          eyeIcon = <Icon name='eye' size={28} color='black' onPress={this.tooglePasswordVisibility}/>;
        }
        else{
          // Visibility = false
          eyeIcon =  <Icon name='eye-slash' size={28} color='black' onPress={this.tooglePasswordVisibility}/>;
        }
        
        return(
            <View style={Styles.BigContainer} >
                {loaderConnexion}
                <View style={Styles.container}>
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
                    onPress={this.Login} 
                    type="clear"
                  />
                </View>
            </View>
        );
    }
}