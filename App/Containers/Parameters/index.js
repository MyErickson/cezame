import React, { Component, useRef } from 'react';
import { Text, View, Dimensions, ScrollView, Image, Animated } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import Font from '../../Themes/Font';
import MapView, { Marker, Callout } from 'react-native-maps';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import { FlatList } from 'react-native-gesture-handler';
const screen = Dimensions.get("window");


export default class Parameters extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "John Doe", 
            email: "email@address.com", 
            tel: "06478754852", 
            password: "mot de passe",
            checked: false
        }
    }

    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    TooglePasswordVisibility = () => {
        this.setState({isPasswordVisibility : !this.state.isPasswordVisibility});
    }


    render() {
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
        return (
            <Layout roundHeader return title="Paramètres" navigation={this.props.navigation}>
                <View style={{ width: 225, height: 225, borderRadius: 45, alignSelf: "center" }}>
                    <Image source={Images.devProfil} style={{ width: 225, height: 225,  borderRadius: 45 }} />
                </View>
                <ScrollView style={{ width: screen.width-65, alignSelf: "center", marginTop: 25, height: screen.height-250 }}>
                    <Input 
                        label='Mon identifiant' 
                        name='name' 
                        value={this.state.name}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.emailErrorMsg} 
                        value={this.state.name} 
                        onChange={this.UpdateInputToState}
                        labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                        inputStyle={{ padding: 0, marginTop: 15, fontSize: 15, color: "#6B6B6B" }}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6", marginTop: 5 }}
                        inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    />
                    <Input 
                        label='Mon adresse e-mail' 
                        name='email' 
                        value={this.state.email}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.emailErrorMsg} 
                        value={this.state.email} 
                        onChange={this.UpdateInputToState}
                        labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                        inputStyle={{ padding: 0, marginTop: 15, fontSize: 15, color: "#6B6B6B" }}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6", marginTop: 5 }}
                        inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    />
                    <Input 
                        label='Tel.' 
                        name='tel' 
                        value={this.state.tel}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.emailErrorMsg} 
                        value={this.state.tel} 
                        onChange={this.UpdateInputToState}
                        labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                        inputStyle={{ padding: 0, marginTop: 15, fontSize: 15, color: "#6B6B6B" }}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6", marginTop: 5 }}
                        inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    />
                    <Input 
                        label='Changer mon mot de passe' 
                        secureTextEntry={!this.state.isPasswordVisibility}
                        name='password' 
                        value={this.state.password} 
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.emailErrorMsg} 
                        value={this.state.password} 
                        onChange={this.UpdateInputToState}
                        rightIcon={eyeIcon}
                        labelStyle={{ fontSize: 15, margin: 0, color: Colors.dark, fontWeight: "normal" }}
                        inputStyle={{ padding: 0, marginTop: 15, fontSize: 15, color: "#6B6B6B" }}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6", marginTop: 5 }}
                        inputContainerStyle={{ borderBottomWidth: 0,height: 25, marginBottom: 10 }}
                    />
                    <View>
                        <CheckBox
                            title="* J'accepte d'être pris en photo"
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked})}
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0, padding: 0, margin: 0, marginTop: 15, marginBottom: 10}}
                            textStyle={{ color: "#6B6B6B", fontSize: 16 }}
                        />
                    </View>
                    <Text style={{ color: "#6B6B6B", fontSize: 15 }}>Sans votre accord, votre visage n'apparaitra pas sur les images du séminaire</Text>
                    <Button 
                        title="Enregistrer" 
                        buttonStyle={{ backgroundColor: Colors.lightPrimary, borderRadius: 35, paddingVertical: 10, marginTop: 25, width: screen.width-125, alignSelf: "center" }} 
                    /> 
                </ScrollView>
                
            </Layout>
        )
    }
}
