import React, { Component } from 'react';
import { View, Dimensions ,Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
const screen = Dimensions.get("window");
import RNFetchBlob from 'rn-fetch-blob';
import AlertGallery  from '../../AlertDialog/AlertGallery'
const optionsImagePicker = {
    title: 'Select Avatar',
    quality:0.5,
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
        const options = {
            title: 'Ajouter une photo',
            tintColor:'#337FF9',
            mediaType:"photo",
            quality:0.4,
            takePhotoButtonTitle:null,
            chooseFromLibraryButtonTitle:"Choisir une photo...",
            cancelButtonTitle:"Annuler",
            storageOptions: {
              skipBackup: true,
              path: 'images',
              cameraRoll:true
            },
           
          };
          
        ImagePicker.showImagePicker(options, (response) => {
        console.log("TCL: UploadImage -> _uploadImage -> response", response)
            
            try{
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
            }catch(e){
            console.log("TCL: UploadImage -> _uploadImage -> e", e)

            }
        
        });
    }

    sendPicture =(value)=>{
        console.log("TCL: UploadImage -> sendPicture -> value", value)
        const { tokenConnection ,getUsers ,info_Token} = this.props
        console.log("TCL: UploadImage -> sendPicture -> info_Token 7", info_Token.trip_id , tokenConnection)
        const id = info_Token.trip_id

        const uri = Platform.OS ==='android'? value.path.slice(1) : value.uri.replace("file://","")


        RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/media_objects/trip_photo`,{
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
              data:id.toString()
              }
           
            ]).then((res) => {
            console.log("TCL: la requete a bien etait envoyé ", res.json())
                
            this.setState({
                alertVisible:true,
                style:true,
                messageAlert:"Votre image a bien été transmis à notre équipe. Elle sera visible après validation."
            })
      
      
            })
            .catch((err) => {
            console.log("TCL: MyQuestions -> onStopRecord -> err", err)
            this.setState({
                alertVisible:true,
                style:false,
                messageAlert:"Une erreur est survenue, veuillez verifiez votre reseau"
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