import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Animated,StatusBar, Platform ,SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import ImageLayout from "react-native-image-layout";
import { Icon,Header } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import RNFS from "react-native-fs";
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import {PermissionsAndroid} from 'react-native';
import { Styles } from './styleGallery'
import ViewGallery from './ViewGallery/ViewGallery'



const screen = Dimensions.get("window");

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cézame souhaite accèder à votre stockage interne de votre téléphone.',
        message:
          'Cézame souhaite accèder à votre stockage interne de votre téléphone' +
          'pour pouvoir enregistrer vos photos.',
        buttonNeutral: 'Me le demander plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission accordée');
    } else {
      console.log('Permission annulée');
    }
  } catch (err) {
    console.warn(err);
  }
}

const optionsImagePicker = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


export default class Gallery extends Component {

    constructor(props){
        super(props);
        this.state = {
            isDone: new Animated.Value(0),
          
            
        };
        this.indexImage=0
    }

    _createFolder = () => {
        const absolutePath = RNFS.ExternalStorageDirectoryPath +'/Cézame'; 
        RNFS.mkdir(absolutePath)
        .then((result) => {
            console.log('result', result)
        })
        .catch((err) => {
            console.warn('err', err)
        })
    }

    _download=(imageUrl)=>{
       console.log("TCL: Gallery -> _download -> imageUrl", imageUrl)

        Platform.OS ==="android" && requestCameraPermission();
        var path = RNFS.ExternalStorageDirectoryPath +'/Cézame/'+((Math.random() * 1000) | 0)+'.jpeg';


        var download = RNFS.downloadFile({
            fromUrl: imageUrl ,
            toFile: path,
          }).promise.then((r) => {
            Animated.timing(this.state.isDone, {
                toValue: 1, 
                duration: 4000
            }).start(() => {
                Animated.timing(this.state.isDone, {
                    toValue: 0, 
                    duration: 1000
                }).start()
            });
        });

        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
            download;
        })
        .catch((err) => {
            console.log(err.message);
        });

    }



    render() {
        this._createFolder();
      
        return (
            <ContainerLayout noPaddingTop allScreenHeader gallery return title="Galerie Photos" navigation={this.props.navigation}>
                    <LinearGradient 
                colors={["#0062EC", "#07318D"]}    
                start= { {x: 0, y: 0 }}
                end={ {x: 1, y: 0 }}
                style={{flex:1}}
                >
                    <ViewGallery download={this._download} navigate={this.props.navigation}/>

            </LinearGradient>
            </ContainerLayout>
        )
    }
}
