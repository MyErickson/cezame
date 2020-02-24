import React, {Component} from 'react'
import { View, Text ,Platform,StatusBar ,SafeAreaView ,Dimensions,Animated,Image,TouchableOpacity  } from 'react-native'
import Colors from '../../../Themes/Colors';
import { Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from '../styleGallery'
import AppStyles from '../../../Themes/AppStyles';
const screen = Dimensions.get("window");
import RNFS from "react-native-fs";
import RNFetchBlob from 'rn-fetch-blob';

class  CurrentImage extends Component{
  state={
    isDone: new Animated.Value(0),
  }

//   sendPicture =()=>{
//     const { tokenConnection ,getUsers ,info_Token} = this.props
//     const id = info_Token.tripId
//     RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/media_objects/user_avatar`,{
//         Authorization : "Bearer "+tokenConnection,
//         headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
//         },[
//           {
  
//          // name est la clé attendu pour le backend
//           name:'file',
//           // filename est le nom ddonné au fichier
//           filename : avatarSource.fileName,
//           // use custom MIME type
//           type :'image/jpg',
//           // data it's the path
//           data:RNFetchBlob.wrap(uri)
//           },
//           {
  
//           // name est la clé attendu pour le backend
//           name:'trip',
//           data:id
//           }
       
//         ]).then((res) => {
//         console.log("TCL: updateImage -> res", res)
//           const data = new FormData
//           data.token = tokenConnection
//           data.id = infoUser.id
  
//            getUsers(data)
  
  
//         })
//         .catch((err) => {
//         console.log("TCL: MyQuestions -> onStopRecord -> err", err)
//         })
//   }

_createFolder = () => {
    const { navigation} = this.props
    let dirs = RNFetchBlob.fs.dirs
    console.log("TCL: CurrentImage -> _createFolder -> dirs", dirs)
    RNFetchBlob.config({
        path : dirs.DownloadDir + '/cézame.jpg',
        // android only options, these options be a no-op on IOS
        addAndroidDownloads : {
          // Show notification when response data transmitted
          notification : true,
          // Title of download notification
          title : 'Great ! Download Success ! :O ',
          // File description (not notification description)
          description : 'An image file.',
          mime : 'image/png',
          // Make the file scannable  by media scanner
          mediaScannable : true,
        }
      })
      .fetch('GET', 'https://cezame-dev.digitalcube.fr/uploads/lisbonne-insolite-lieux-1-5e3976ba9407a180291385.jpg')
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
      }).catch(err=>{
      console.log("TCL: CurrentImage -> _createFolder -> err", err)
  
      })
    
}


    render ( ){
        this._createFolder()
        
        const { navigation} = this.props
        console.log("TCL: CurrentImage -> render -> this.props", this.props)
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
                <View  style={{flex:1}}>
                <Image source={{uri: navigation.state.params.image}}
                    style={{flex:1}}
                    resizeMode="cover"
                    />
                </View>
                  

       <SafeAreaView style={[{backgroundColor:Colors.lightSecondary},Platform.OS === "android" && {height:20}]}>
                <View style={{height:45}}>
                    <View style={[{width: screen.width, height:0,},Platform.OS==="android"? {top:-45} : {top:-28} ]}>
                        <TouchableOpacity  style={[Styles.footerIconDownload,{flex:1,position:'absolute'}]}
                        onPress={() => {this._createFolder()} }
                
                        >
                        
                            <Icon
                               
                                name="download"
                                color="white"
                                type="font-awesome"
                              
                                
                            />
                       
                        </TouchableOpacity >
                    
                        <Animated.View style={[Styles.animetedFooter,{opacity: this.state.isDone, }]}>
                            <Text style={{ textAlign: "center" }}>Téléchargement terminé.</Text>
                        </Animated.View>
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
            </View>

        )
    }
    }
    

export default CurrentImage
