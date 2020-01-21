import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Animated,StatusBar, Platform  } from 'react-native';
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
            isDone: new Animated.Value(0)
        }
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

    _download(image) {
        requestCameraPermission();
        var path = RNFS.ExternalStorageDirectoryPath +'/Cézame/'+((Math.random() * 1000) | 0)+'.jpeg';


        var download = RNFS.downloadFile({
            fromUrl: image.uri,
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
    
    // HEADER PAGE DETAIL IMAGE
    _renderPageHeader = (image, index, onClose) => {
        return (
            <View style={{flex:1}}>
            
            <StatusBar translucent backgroundColor={Colors.rightColor} style={{zIndex:1}} />
     
            <Header
                containerStyle={Platform.OS==="android"&&{marginBottom:-0.2,height:40}}
                leftComponent={{ icon: 'close', color: '#fff', onPress: () => onClose() ,underlayColor:"none"}}
                leftContainerStyle={{height:40}}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: [Colors.leftColor, Colors.rightColor],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0 },
                }}
            />
   </View>
        );
     
    }

    // FOOTER PAGE DETAIL IMAGE
    _renderPageFooter = (image, index, onClose) => {
        return(
            <View>
                <View style={{width: screen.width, height: 45 }}>
                    <View style={Styles.footerIconDownload}>
                        <Icon
                            underlayColor="none"
                            name="download"
                            color="white"
                            type="font-awesome"
                            onPress={() => {this._download(image)} }
                        />
                    </View>
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
                            containerStyle={{ marginRight: 15 }}
                            onPress={() => {NavigationService.navigate("Program"), onClose()}}
                        />
                        <Icon 
                            underlayColor="none"
                            name="comments"
                            color="white"
                            type="font-awesome"
                            onPress={() => {NavigationService.navigate("Chat"), onClose()}}
                        />  
                    </View>
                    <Icon
                        underlayColor="none"
                        name="menu"
                        color="white"
                        onPress={ () => { this.props.navigation.toggleDrawer(), onClose() } }
                    />
                </View>
            </View>
        )
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
                <ImageLayout
                    images={[
                        { uri: "https://source.unsplash.com/random/",dimensions:{width:800 , height: 600} },
                        {uri: "https://source.unsplash.com/random/500x1000",dimensions:{width:500 , height: 1000} },
                        { uri: "https://source.unsplash.com/random/400x600" ,dimensions:{width:400 , height: 600} },
                        { uri: "https://source.unsplash.com/random/900x600",dimensions:{width:900 , height: 600}  },
                        { uri: "https://source.unsplash.com/random/800x500" ,dimensions:{width:800 , height: 500} },
                        { uri: "https://source.unsplash.com/random/800x400" ,dimensions:{width:800 , height: 400} },
                        { uri: "https://source.unsplash.com/random/1200x600" ,dimensions:{width:1200 , height: 600} },
                        { uri: "https://source.unsplash.com/random/300x600" ,dimensions:{width:300 , height: 600} },
                        { uri: "https://source.unsplash.com/random/1200x700" ,dimensions:{width:1200 , height: 700} },
                        { uri: "https://source.unsplash.com/random/500x700" ,dimensions:{width:500 , height: 700} },
                    ]}
                    imageContainerStyle={{borderRadius: 15}}
                    spacing={3}
                    sorted={true}
                    backgroundColor="transparent"
                    renderPageHeader={this._renderPageHeader}
                    renderPageFooter={this._renderPageFooter}
                />
            </LinearGradient>
            </ContainerLayout>
        )
    }
}
