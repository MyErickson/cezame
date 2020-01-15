import React, { Component} from 'react';
import { Text, View, Dimensions, ScrollView, Image,  Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import Images from '../../Themes/Images';
import ImagePicker from 'react-native-image-picker';

import { Styles } from './styleParam'

export default class Parameters extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email: "" ,
            tel: "", 
            password: "mot de passe",
            checked: false
        };
        this.input= {}
    }

    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    TooglePasswordVisibility = () => {
        this.setState({isPasswordVisibility : !this.state.isPasswordVisibility});
    }

    inputFocus=(id)=>{  
        this.input[id].focus()
   }
   
   downloadImage=()=>{
    const options = {
        title: 'Changer votre photo de profil',
        takePhotoButtonTitle:"Prendre une Photo...",
        chooseFromLibraryButtonTitle:"Bibliothèque...",
        cancelButtonTitle:"Annuler",
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
    
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
        //   const source = { uri: response.uri };
      
          // You can also display the image using data:
           const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
           console.log("TCL: Parameters -> downloadImage ->  source ",  source )
          this.setState({
            avatarSource: source,
          });
        }
      });
   }

    render() {
        // password eye icon
        const { 
            firstName,
            lastName,
            email ,
            tel,
            emailErrorMsg ,
            checked,
            password,
            isPasswordVisibility
            }
              = this.state
        const {info_User }= this.props
        console.log("TCL: Parameters -> render -> info_User", info_User.firstName)


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
            <ContainerLayout  title="Paramètres" navigation={this.props.navigation}>
                <ScrollView       
                style={{ marginHorizontal: 0 ,marginBottom:10 }}
                showsVerticalScrollIndicator = {false}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps="handled"
                contentInsetAdjustmentBehavior="never">
                <LinearGradient 
                colors={[Colors.leftColor, Colors.rightColor]}    
                start={ {x: Platform.OS=== "ios"?0.3:0.2, y: Platform.OS=== "ios"? -1.5 : -1.1}} end ={{x:Platform.OS=== "ios"? 1 : 1, y: 0 }} 
                style={Styles.lineagradient}/>
              
  
              
                <View style={Styles.containerImage} onPress={()=>console.log("change image")}>
                        <Image source={Images.devProfil} style={{ width: 225, height: 225,  borderRadius: 45 }} onPress={()=>console.log("change image")}/>
             
                </View>
                <View style={{justifyContent:"center"}}>
                <Icon 
                        underlayColor="none"
                        name="download"
                        color="white"
                        type="font-awesome"
                        containerStyle={{ marginTop: 20 ,  }}
                        iconStyle={{ backgroundColor: "rgba(0,0,0,.5)", padding:8, borderRadius:25}}
                        onPress={()=>this.downloadImage()}
                    />
                </View> 
           
                    <View style={{ marginHorizontal: 40  }}>
                        <Input 
                            label='Prénom' 
                            name='firstName' 
                            value={firstName}
                            placeholder={info_User.firstName}
                            errorStyle={{ color: 'red' }}
                            errorMessage={emailErrorMsg} 
                            onChange={this.UpdateInputToState}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={() => { this.inputFocus("lastName") }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        <Input 
                           ref={ text => this.input["lastName"] = text}
                            label='Nom' 
                            name='lastName' 
                            value={lastName}
                            placeholder={info_User.lastName}
                            errorStyle={{ color: 'red' }}
                            errorMessage={emailErrorMsg} 
                            onChange={this.UpdateInputToState}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={() => { this.inputFocus("email") }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        <Input 
                            ref={ text => this.input["email"] = text}
                            label='Mon adresse e-mail' 
                            name='email' 
                            value={email}
                            placeholder={info_User.email}
                            errorStyle={{ color: 'red' }}
                            errorMessage={emailErrorMsg} 
                            onChange={this.UpdateInputToState}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={() => { this.inputFocus("tel") }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        <Input 
                            ref={ text => this.input["tel"] = text}
                            label='Tel.' 
                            name='tel' 
                            value={tel}
                            placeholder={tel}
                            errorStyle={{ color: 'red' }}
                            errorMessage={emailErrorMsg} 
                            onChange={this.UpdateInputToState}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={() => { this.inputFocus("password") }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        <Input 
                            ref={ text => this.input["password"] = text}
                            label='Changer mon mot de passe' 
                            secureTextEntry={!isPasswordVisibility}
                            name='password' 
                            value={password}
                            errorStyle={{ color: 'red' }}
                            errorMessage={emailErrorMsg} 
                            onChange={this.UpdateInputToState}
                            rightIcon={eyeIcon}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={()=>{}}
                            returnKeyType="send"
                        />
                        <View>
                            <CheckBox
                                title="* J'accepte d'être pris en photo"
                                checked={checked}
                                onPress={() => this.setState({checked: !checked})}
                                containerStyle={Styles.containerCheckbox}
                                textStyle={{ color: "#6B6B6B", fontSize: 16 }}
                            />
                        </View>
                        <Text style={{ color: "#6B6B6B", fontSize: 15 }}>Sans votre accord, votre visage n'apparaitra pas sur les images du séminaire</Text>
                        <Button 
                            title="Enregistrer" 
                            buttonStyle={Styles.buttonStyle} 
                        /> 
                    </View>
                </ScrollView>
                
            </ContainerLayout>
        )
    }
}
