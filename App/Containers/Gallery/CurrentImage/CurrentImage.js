import React, {Component} from 'react'
import { View, Text ,Platform,StatusBar ,SafeAreaView ,Dimensions,Animated,Image,TouchableOpacity   } from 'react-native'
import Colors from '../../../Themes/Colors';
import { Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from '../styleGallery'
import AppStyles from '../../../Themes/AppStyles';
const screen = Dimensions.get("window");
import RNFetchBlob from 'rn-fetch-blob';
import AlertDownload from '../../AlertDialog/AlertDownload';
// import Share from 'react-native-share';
var RNFS = require('react-native-fs');


class  CurrentImage extends Component{
  state={

    alertVisible:false,
    messageAlert:"",
    style:true
  }


componentDidMount(){
    let dirs = RNFetchBlob.fs.dirs.DocumentDir +'/cezame'
    console.log("TCL: CurrentImage -> componentDidMount -> res", RNFS.DocumentDirectoryPath )
    // RNFetchBlob.fs.mkdir(dirs)
    // .then((res) => { 
      
    // })
    
    // .catch((err) => { 
    // console.log("TCL: CurrentImage -> componentDidMount -> err", err)
        
    // })
}

_createFolder = () => {
    const { navigation} = this.props
    console.log("TCL: CurrentImage -> render -> this.props",  navigation)
    let dirs = RNFetchBlob.fs.dirs.DocumentDir

    console.log("TCL: CurrentImage -> _createFolder -> dirs",dirs)
    let name = `/${Date.now()}.heic`
    RNFetchBlob.config({
       
        // android only options, these options be a no-op on IOS

        path : "/var/mobile/Containers/Data/Application/6350711B-8E4C-4083-B0C6-25A8457173F4/Documents/"+ name,
        addAndroidDownloads : {
          // Show notification when response data transmitted
          notification : true,
          // Title of download notification
          title : `Download Success ! ...${name} `,
          // File description (not notification description)
          description : 'An image file.',
          // Make the file scannable  by media scanner
          mediaScannable : true,
        
        }
      })
      .fetch('GET', navigation.state.params.image)
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
        this.setState({
            alertVisible:true,
            messageAlert:"Telechargement terminé"
        })
        
      }).catch(err=>{
      console.log("TCL: CurrentImage -> _createFolder -> err", err)
  
      })
    
    }

    closeAlert=()=>{
        this.setState({
        alertVisible:false,
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
