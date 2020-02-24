import React, { Component } from 'react';
import { View, Dimensions ,Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
const screen = Dimensions.get("window");
import RNFetchBlob from 'rn-fetch-blob';
import AlertGallery  from '../../AlertDialog/AlertGallery'
const optionsImagePicker = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


export default class UploadImage extends Component {

    constructor(props){
        super(props);
        this.state = {
            alertVisible:false,
            messageAlert:"",
            style:true

        }
    }

    _uploadImage = () => {
        ImagePicker.launchImageLibrary(optionsImagePicker, (response) => {
            

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log('Response = ', response);
                this.sendPicture(response )
                
            }
        });
    }

    sendPicture =(value)=>{
        const { tokenConnection ,getUsers ,info_Token} = this.props
        console.log("TCL: UploadImage -> sendPicture -> info_Token 7", info_Token , tokenConnection)
        const id = info_Token.trip_id

        const uri = Platform.OS ==='android'? value.path.slice(1) : value.uri.replace("file://","")


        RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/media_objects/user_avatar`,{
            Authorization : "Bearer "+tokenConnection,
            headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
            },[
              {
      
             // name est la clé attendu pour le backend
              name:'file',
              // filename est le nom ddonné au fichier
              filename : value.fileName,
              // use custom MIME type
              type :'image/jpg',
              // data it's the path
              data:RNFetchBlob.wrap(uri)
              },
              {      
              // name est la clé attendu pour le backend
              name:'trip',
              data:id
              }
           
            ]).then((res) => {
            console.log("TCL: updateImage -> res", res)
                
            this.setState({
                alertVisible:true,
                style:true,
                messageAlert:" Votre photo a bien été envoyé. Une verification sera faite."
            })
      
      
            })
            .catch((err) => {
            console.log("TCL: MyQuestions -> onStopRecord -> err", err)
            this.setState({
                alertVisible:false,
                style:false,
                messageAlert:" Votre photo a bien été envoyé. Une verification sera faite."
            })
            })
      }

      closeAlert=()=>{
          this.setState({
            alertVisible:false,
          })
        
      }

    render() {
        const { alertVisible,
            closeAlert,
            messageAlert,
        style} =this.state
        return (
            <View style={{ position: "absolute", justifyContent: "center", left: (screen.width/2)-30, top: -18 }}>
                <Icon 
                    underlayColor="none"
                    name="add-circle"
                    color="white"
                    size={60}
                    onPress={() => this._uploadImage()}
                />  
                <AlertGallery
                    alertVisible={alertVisible}
                    closeAlert={this.closeAlert}
                    messageAlert={messageAlert}
                    style={style}
                />
            </View>
        )
    }
}