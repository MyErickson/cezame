import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
const screen = Dimensions.get("window");

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
        }
    }

    _uploadImage = () => {
        ImagePicker.launchImageLibrary(optionsImagePicker, (response) => {
            console.log('Response = ', response);

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
            
                this.setState({
                avatarSource: source,
                });
            }
        });
    }

    render() {
        return (
            <View style={{ position: "absolute", justifyContent: "center", left: (screen.width/2)-30, top: -18 }}>
                <Icon 
                    name="add-circle"
                    color="white"
                    size={60}
                    onPress={() => this._uploadImage()}
                />  
            </View>
        )
    }
}