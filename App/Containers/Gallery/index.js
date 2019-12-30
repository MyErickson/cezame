import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../Components/Layout';
import ImageLayout from "react-native-image-layout";
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import RNFS from "react-native-fs";
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import {PermissionsAndroid} from 'react-native';

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
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.leftColor, Colors.rightColor]} 
                style={{ 
                    width: screen.width,
                    paddingVertical: 10, alignItems: 'flex-start'
                }}
            >
                <Icon
                    name="close" 
                    onPress={() => {onClose();}}
                    color="white"
                    containerStyle={{ marginLeft: 15 }}
                />
            </LinearGradient>
        );
    }

    // FOOTER PAGE DETAIL IMAGE
    _renderPageFooter = (image, index, onClose) => {
        return(
            <View>
                <View style={{width: screen.width, height: 45 }}>
                    <View style={{ zIndex: 5, backgroundColor: "rgba(0,0,0,.5)", borderRadius: 25, width: 45, height: 45, alignSelf: "center", justifyContent: "center", alignContent: "center" }}>
                        <Icon
                            name="download"
                            color="white"
                            type="font-awesome"
                            onPress={() => {this._download(image)} }
                        />
                    </View>
                    <Animated.View style={{ opacity: this.state.isDone, backgroundColor: 'rgba(255,255,255,.5)', width: 200, borderRadius: 10, alignSelf: "center" }}>
                        <Text style={{ textAlign: "center" }}>Téléchargement terminé.</Text>
                    </Animated.View>
                </View>
                <View style={{ 
                    width: screen.width, 
                    backgroundColor: Colors.lightSecondary, 
                    flexDirection: "row", justifyContent: "space-between", 
                    paddingVertical: 15, paddingHorizontal: 15, 
                    position: this.props.roundHeader == true ? "absolute" : "relative",
                    bottom: 0
                }}>
                    <View style={AppStyles.style.flex}>
                        <Icon 
                            name="home"
                            color="white"
                            type="font-awesome"
                            containerStyle={{ marginRight: 15 }}
                            onPress={() => {NavigationService.navigate("Program"), onClose()}}
                        />
                        <Icon 
                            name="comments"
                            color="white"
                            type="font-awesome"
                            onPress={() => {NavigationService.navigate("Chat"), onClose()}}
                        />  
                    </View>
                    <Icon
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
            <Layout noPaddingTop allScreenHeader gallery return title="Galerie Photos" navigation={this.props.navigation}>
                <ImageLayout
                    images={[
                        { uri: "https://source.unsplash.com/random/800x600" },
                        {uri: "https://source.unsplash.com/random/500x1000"},
                        { uri: "https://source.unsplash.com/random/400x600" },
                        { uri: "https://source.unsplash.com/random/900x600" },
                        { uri: "https://source.unsplash.com/random/800x500" },
                        { uri: "https://source.unsplash.com/random/800x400" },
                        { uri: "https://source.unsplash.com/random/1200x600" },
                        { uri: "https://source.unsplash.com/random/300x600" },
                        { uri: "https://source.unsplash.com/random/1200x700" },
                        { uri: "https://source.unsplash.com/random/500x700" },
                    ]}
                    imageContainerStyle={{borderRadius: 15}}
                    spacing={3}
                    sorted={true}
                    backgroundColor="transparent"
                    renderPageHeader={this._renderPageHeader}
                    renderPageFooter={this._renderPageFooter}
                />
            </Layout>
        )
    }
}
