import React, { Component} from 'react';
import { Text, View, Dimensions, ScrollView, Image,  Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import Images from '../../Themes/Images';
import ImagePicker from 'react-native-image-picker';
import AlertDialog from '../AlertDialog/AlertDialog'
import { Styles } from './styleParam'
import axios from 'axios';


export default class Parameters extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email: "" ,
            tel: "", 
            password: "",
            checked: false,
            alertVisible:false, 
            messageAlert:"",
            style:false,    // color text alert (false = red & true = blue)
            logOutOrRegister:undefined, // string logout or register
            alertConfirm:undefined, //  confirm alert by yes or cancel button
            avatarSource:undefined
        };
        this.input= {}
    }
    componentDidMount(){
 
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


   logOut =()=>{
 
    AsyncStorage.removeItem('jwt_auth')
 
    this.props.initializeState()
    this.props.navigation.navigate("Home")
   }

   goToRegister=()=>{
     const { email , firstName , lastName , checked , tel , password,avatarSource} = this.state
     const { info_User ,tokenConnection } = this.props
     console.log("TCL: Parameters -> goToRegister -> info_User ", info_User )



     var data = new Object ;
    

     data.id= info_User.id ;
     data.token=tokenConnection;
     data.password = password.trim() ?   password : info_User.password  
     data.firstName = firstName.trim() ?  firstName : info_User.firstName  
     data.lastName = lastName.trim() ?  lastName : info_User.lastName  
     data.email = email.trim() ?  email : info_User.email 
     data.tel = tel.trim() ?  tel  :info_User.tel  

    if(avatarSource){
        data.image=avatarSource  

    }

    console.log("TCL: Parameters -> goToRegister -> data", data)
    axios.defaults.headers['Authorization']= "Bearer "+data.token;
    axios.put(`users/${data.id}`,{
        
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName,
            password:data.password,
            tel:data.tel,
            checked:checked,
            image:"string string string"
        }).then((response)=>{
        console.log("axios update profile ",response)
    
            this.setState({
                firstName:"",
                lastName:"",
                email:"" , 
                password:"",
                tel:"",
                password:"",
                messageAlert:"Modifié",
                alertConfirm:false,
                style:true,
                messageAlertPWd:undefined

                })
      
        this.props.info_user(response.data)
       
    
        }).catch((err)=>{
            console.log("axios error update profile ",err.response.data.violations)
            err.response.data.violations.map((value)=>{
                this.setState({
                    login:"", 
                    email:"" , 
                    password:"",
                    changePassword:"",
                    messageAlert:value.message,
                    alertConfirm:false,
                    style:false,
                    messageAlertPWd:undefined
    
                })

            })
        
        } )
    
   }


   logOut =()=>{
 
    AsyncStorage.removeItem('jwt_auth')
 
    this.props.initialize_State()
    this.props.navigation.navigate("Home")
   }


   register=(value,text)=>{
      this.setState({
        alertVisible:true,
        messageAlert:text,
        alertConfirm:true,
        logOutOrRegister:value,
        style:true,
      })
   }

   yesConfirm=(logOutOrRegister)=>{
       
        if(logOutOrRegister === "register"){
            this.goToRegister()
        }else{
            this.logOut()
        }
    }

    closeAlert =()=>{
    this.setState({
        alertVisible:false,
    })
    }

    render() {
        // password eye icon
        const { 
            firstName,
            lastName,
            email ,
            tel,
            checked,
            password,
            isPasswordVisibility,
            alertVisible,
            messageAlert,
            alertConfirm,
            logOutOrRegister,
            style,

            }= this.state

        const {info_User }= this.props

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
                            placeholder={info_User&&info_User.firstName}
                            placeholderTextColor="#CCCCCC"
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
                            placeholder={info_User&&info_User.lastName}
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
                            placeholder={info_User&&info_User.email}
                            placeholderTextColor="#CCCCCC"
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
                            placeholderTextColor="#CCCCCC"
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
                            placeholder="**********"
                            placeholderTextColor="#CCCCCC"
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
                            buttonStyle={[Styles.buttonStyle,{backgroundColor: Colors.lightPrimary,marginTop: 25,}]} 
                            onPress={()=>this.register("register","Êtes-vous sûre de vouloir modifier vos informations ? ")}
                        /> 
                          <Button 
                            title="Déconnexion" 
                            buttonStyle={[Styles.buttonStyle,{backgroundColor:Colors.youtube,marginTop:10  }]} 
                            onPress={()=>this.register("logout","Êtes-vous sûre de vouloir quitter l'application ? ")}
                        /> 
                    </View>
                </ScrollView>
                <AlertDialog 
                    alertVisible={alertVisible}
                    messageAlert={messageAlert}
                    closeAlert={this.closeAlert}
                    style={style}
                    logOutOrRegister={logOutOrRegister}
                    alertConfirm={alertConfirm }
                    yesConfirm={this.yesConfirm}
                 />
                
            </ContainerLayout>
        )
    }
}
