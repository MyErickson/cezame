import React, {Component} from 'react'
import { View, Text ,Platform,StatusBar ,SafeAreaView ,Dimensions,Image,TouchableOpacity  ,Linking } from 'react-native'
import Colors from '../../../Themes/Colors';
import { Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from '../styleGallery'
import AppStyles from '../../../Themes/AppStyles';
const screen = Dimensions.get("window");
import RNFetchBlob from 'rn-fetch-blob';
import AlertDownload from '../../AlertDialog/AlertDownload';
import CameraRoll from "@react-native-community/cameraroll";
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'


class  CurrentImage extends Component{
  state={

    alertVisible:false,
    messageAlert:"",
    style:true,
    askPermission:false
  }


    componentDidMount (){
    
    this.checkPermission()

    }

    checkPermission= ()=>{
        let permissionOs = Platform.OS === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        const res =  check(permissionOs)
        .then((permissionResult) => {
            console.log("TCL: CurrentImage -> componentDidMount -> permissionResult", permissionResult)
            if(permissionResult !== "granted"){
                
                this.setState({
                    alertVisible:true,
                    messageAlert:"Vous devez accepter l'autorisation  pour enregistrer une photo sur votre appareil. Vous allez être redirigé.",
                    askPermission:true
                })
                return false
            }else{
                return true
            }
        } )
        return res
    }

_createFolder = async () => {
    const { navigation} = this.props


    let dirs = Platform.OS === "ios" ?  RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir
    
    const permission = await this.checkPermission()
    

    let name = `/${Date.now()}.png`
    if(permission){
        RNFetchBlob.config({
       
            // android only options, these options be a no-op on IOS
            path : dirs + name,
            // appendExt : 'jpeg',
            addAndroidDownloads : {
              // Show notification when response data transmitted
              notification : true,
              // Title of download notification
              title : `Download Success ! ...${name} `,
              // File description (not notification description)
              description : 'An image file.',
              // Make the file scannable  by media scanner
              mediaScannable : false,
            
            }
          })
          .fetch('GET', navigation.state.params.image)
          .then((res) => {
    
           Platform.OS === "ios" && CameraRoll.saveToCameraRoll(res.path(),'photo')
            
            this.setState({
                alertVisible:true,
                messageAlert:"Telechargement terminé"
            })
            
          }).catch(err=>{
          console.log("TCL: CurrentImage ->not permission-> err", err)
          
          })
        
    }
    
    }

    closeAlert=()=>{
        const { askPermission } =this.state
      
        if(askPermission){
            Platform.OS === "ios" ? Linking.openURL('app-settings:') : AndroidOpenSettings.appDetailsSettings()
        }
        this.setState({
            alertVisible:false,
            askPermission:false
        })
       
    }

    render ( ){
        // this._createFolder()
        
        const { navigation} = this.props
        const { messageAlert ,style ,alertVisible } =this.state
        return (
            
        <View style={{flex:1}}>
            <View >
                
                <StatusBar translucent backgroundColor={Colors.rightColor} style={{zIndex:1}} />
         
                <Header
                    containerStyle={Platform.OS==="android"&&{height:50,marginTop:Platform.OS==="android"?15:0}}
                    leftComponent={{ icon: 'close', color: '#fff', onPress: () => {navigation.goBack()} ,underlayColor:"none"}}
                    leftContainerStyle={{height:40}}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [Colors.leftColor, Colors.rightColor],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 },
                    }}
                />
               
        </View>
                <View  style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)'}}>
                <Image source={{uri: navigation.state.params.image}}
                    style={{flex:1}}
                    resizeMode="cover"
                    />
                </View>
                  

       <SafeAreaView style={[{backgroundColor:Colors.lightSecondary},Platform.OS === "android" && {height:20}]}>
                <View style={{height:45}}>
                    <View style={[{width: screen.width, height:0},Platform.OS==="android"? {bottom:26} : {bottom:28} ]}>
                        <TouchableOpacity  
                        style={[Styles.footerIconDownload,]}
                        onPress={this._createFolder }
                
                        >
                        
                            <Icon
                               
                                name="download"
                                color="white"
                                type="font-awesome"
                                
                                
                            />
                       
                        </TouchableOpacity >
                    
                      
                    </View>
                    <View style={Styles.footerContainer}>
                        <View style={AppStyles.style.flex}>
                            <Icon 
                                underlayColor="none"
                                name="home"
                                color="white"
                                type="font-awesome"
                                containerStyle={{ marginRight: 20 }}
                                onPress={() => { navigation.navigate("Program") }}
                            />
                            <Icon 
                                underlayColor="none"
                                name="comments"
                                color="white"
                                type="font-awesome"
                                onPress={() => { navigation.navigate("Chat") }}
                            />  
                        </View>
                        <Icon
                            underlayColor="none"
                            name="menu"
                            color="white"
                            onPress={ () => {  navigation.toggleDrawer()  } }
                        />
                    </View>
                </View>
                </SafeAreaView>
                <AlertDownload
                alertVisible={alertVisible}
                closeAlert={this.closeAlert}
                messageAlert={messageAlert}
                style={style}
                />

            </View>

        )
    }
    }
    

export default CurrentImage
