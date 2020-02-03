import React, {PureComponent} from 'react';
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
import RNFetchBlob from 'rn-fetch-blob';

export default class Parameters extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email: "" ,
            phone: "", 
            password: "",
            checked: false,
            alertVisible:false, 
            messageAlert:"",
            avatar:null,
            style:false,    // color text alert (false = red & true = blue)
            logOutOrRegister:undefined, // string logout or register
            alertConfirm:undefined, //  confirm alert by yes or cancel button
            avatarSource:undefined,
            infoUser:undefined
        };
        this.input= {}
    }
    componentDidMount(){
        const{ infoUser}  = this.props
        if( infoUser){
            this.setState({
                checked:infoUser.imageRights
            })
        }
        console.log("je suis ici ")
    }
    static getDerivedStateFromProps(props,state){
        if( props.infoUser){
            state.infoUser = props.infoUser
        }else{
            return null
        }

       
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
        title: 'Changer votre Avatar',
        tintColor:'#337FF9',
        quality:0.5,
        takePhotoButtonTitle:null,
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
          this.setState({
            avatarSource: response,
          });
          this.updateImage()
        }
      });
   }


   logOut =()=>{
 
    AsyncStorage.removeItem('jwt_auth')
 
    this.props.initializeState()
    this.props.navigation.navigate("Home")
   }

   goToRegister=()=>{
     const { email , firstName , lastName , checked , phone , password,avatarSource, avatar} = this.state
     const { infoUser ,tokenConnection } = this.props
     console.log("TCL: Parameters -> goToRegister -> info_User ", avatar )



     var data = new Object ;
    

     data.id= infoUser.id ;
     data.token=tokenConnection;
     data.firstName = firstName.trim() ?  firstName : infoUser.firstName  
     data.lastName = lastName.trim() ?  lastName : infoUser.lastName  
     data.email = email.trim() ?  email : infoUser.email 
     data.phone = phone.trim() ?  phone :infoUser.phone 
     data.avatar = avatar ? avatar : infoUser.avatar && infoUser.avatar["@id"]
    if( data.password){
        data.password =   password  
    }


    if(avatarSource){
        data.image=avatarSource  
   

    }

    console.log("TCL: Parameters -> goToRegister -> data", data)
    axios.defaults.headers['Authorization']= "Bearer "+data.token;
    axios.put(`https://cezame-dev.digitalcube.fr/api/users/${data.id}`,{
        
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName,
            password:data.password,
            phone:data.phone,
            imageRights:checked,
            avatar:data.avatar
           
        }).then((response)=>{
        console.log("TCL: Parameters -> goToRegister -> response", response)

    
            this.setState({
                firstName:"",
                lastName:"",
                email:"" ,
                phone:"",
                password:"",
                messageAlert:"Modifié",
                alertConfirm:false,
                style:true,
                messageAlertPWd:undefined

                })
      
        this.props.info_user(response.data)
       
    
        }).catch((err)=>{
        console.log("TCL: Parameters -> goToRegister -> err", err.response)
       
            err.response.data.violations.map((value)=>{
                this.setState({
                    messageAlert:value.message,
                    alertConfirm:false,
                    style:false,
                    messageAlertPWd:undefined
    
                })

            })
        
        } )
    
   }


   updateImage=()=>{
       const { avatarSource } =this.state
       console.log("TCL: updateImage -> avatarSource", avatarSource.uri)
       const { tokenConnection } = this.props
   
       if(avatarSource){

        const uri = Platform.OS ==='android'? avatarSource.path.slice(1) :avatarSource.uri.replace("file://","")


    RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/media_objects`,{
      Authorization : "Bearer "+tokenConnection,
      headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
      },[
        {

       // name est la clé attendu pour le backend
        name:'file',
        // filename est le nom ddonné au fichier
        filename : avatarSource.fileName,
        // use custom MIME type
        type :'image/jpg',
        // data it's the path
        data:RNFetchBlob.wrap(uri)
        },
     
      ]).then((res) => {

        this.setState({
            avatar:res.json()["@id"]
    
           })

      })
      .catch((err) => {
      console.log("TCL: MyQuestions -> onStopRecord -> err", err)
      })
    
    }
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
            this.setState({
                alertVisible:false,
            })
            setTimeout(() => 
                this.logOut()
            , 200);
            
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
            phone,
            checked,
            password,
            isPasswordVisibility,
            alertVisible,
            messageAlert,
            alertConfirm,
            logOutOrRegister,
            style,
            infoUser,
            avatarSource,
            avatar
            }= this.state



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
                        <Image source={avatarSource?avatarSource :  infoUser && infoUser.avatar? {uri:infoUser.avatar.contentUrl } :Images.devProfil} style={{ width: 225, height: 225,  borderRadius: 45 }} onPress={()=>console.log("change image")}/>
             
                </View>
                <View style={{ alignItems:'center'}}>
                <View style={{width:80,borderRadius:40}}>

                <Icon 
                        underlayColor="none"
                        name="download"
                        color="white"
                        type="font-awesome"
                        containerStyle={{ margin: 20 }}
                        iconStyle={{ backgroundColor: "rgba(0,0,0,.5)", padding:8, borderRadius:25}}
                        onPress={()=>this.downloadImage()}
                    />
                </View> 
                </View>
                    <View style={{ marginHorizontal: 40  }}>
                        <Input 
                            label='Prénom' 
                            name='firstName' 
                            value={firstName}
                            placeholder={infoUser&&infoUser.firstName}
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
                            placeholderTextColor="#CCCCCC"
                            placeholder={infoUser&&infoUser.lastName}
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
                            placeholder={infoUser&&infoUser.email}
                            placeholderTextColor="#CCCCCC"
                            onChange={this.UpdateInputToState}
                            labelStyle={Styles.labelInput}
                            inputStyle={Styles.inputStyle}
                            containerStyle={Styles.containterStyle}
                            inputContainerStyle={Styles.inputContainerStyle}
                            onSubmitEditing={() => { this.inputFocus("phone") }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        <Input 
                            ref={ text => this.input["phone"] = text}
                            label='Tel.' 
                            name='phone' 
                            value={phone}
                            placeholder={infoUser&&infoUser.phone}
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
                                uncheckedColor={checked?'green' : '#6B6B6B'}
                                onPress={() => this.setState({checked: !checked})}
                                containerStyle={Styles.containerCheckbox}
                                textStyle={{ color: "#6B6B6B", fontSize: 16 }}
                            />
                        </View>
                        {infoUser && infoUser.imageRights?
                        <Text style={{ color: "green", fontSize: 15 }}>
                        Vous avez accepte d'apparaitre sur les images du séminaire</Text>
                        :
                        <Text style={{ color: "#6B6B6B", fontSize: 15 }}>
                        Sans votre accord, votre visage n'apparaitra pas sur les images du séminaire'</Text>
                        }
                        <Button 
                            title="Enregistrer" 
                            buttonStyle={[Styles.buttonStyle,{backgroundColor: Colors.lightPrimary,marginTop: 25,}]} 
                            onPress={()=>this.register("register","Êtes-vous sûre de vouloir modifier vos informations ? ")}
                        /> 
                          <Button 
                            title="Déconnexion" 
                            buttonStyle={[Styles.buttonStyle,{backgroundColor:Colors.youtube,marginTop:10,marginBottom:20  }]} 
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
