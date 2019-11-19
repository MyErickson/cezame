import React, { Component } from 'react';
import { Text, View, ScrollView,Button, ActivityIndicator, TextInput } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }

        this.storeData = this.storeData.bind(this);
        this.getData = this.getData.bind(this);

        this.UpdateInputToState = this.UpdateInputToState.bind(this);
        this.Login = this.Login.bind(this);

    }

    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        console.log(event.nativeEvent.text)
        this.setState({ [name] :  event.nativeEvent.text})
    }

    storeData = async (key, value) => {
        try {
           await AsyncStorage.setItem(key, value);
        } catch (e) {
          // saving error
        }
    }

    getData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key)
          if(value !== null) {
            // value previously stored
            return value
          }
        } catch(e) {
          // error reading value
        }
    }

    Login = () => {
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
          .then(function(response) {
            //handle success
            // console.log('response : ', response.data.token);
            //console.log(response.data.token)
            const token = response.data.token;

            this.storeData('jwt_auth', token);
            const tokenFromAsyncStorage = this.getData('jwt_auth');
            console.log(tokenFromAsyncStorage);
          })
          .catch(function(error) {
            //handle error
            console.log("error :  ", error);
          });
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>LOGIN PAGE</Text>
                <TextInput name="email" placeholder='email' value={this.state.email} onChange={this.UpdateInputToState}></TextInput>
                <TextInput name="password" placeholder='password'  value={this.state.password} onChange={this.UpdateInputToState}></TextInput>
                <Button  title="Connexion" onPress={this.Login}></Button>
            </View>
        );
    }
}