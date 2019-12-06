import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../Components/Layout';
import ImageLayout from "react-native-image-layout";
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");

export default class Gallery extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    _renderImage = (image, index, onClose) => {
        console.log("Image : ",image);
        return (
            <View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.leftColor, Colors.rightColor]} 
                    style={{ 
                        width: screen.width,
                        height: screen.height, 
                        paddingTop: 50, 
                    }}
                />
                <View style={{ position: "absolute", top: 10, zIndex: 5, }}>
                    <TouchableWithoutFeedback onPress={() => {onClose();}}>
                        <Icon
                            name="arrow-back" 
                            style={{marginLeft: 10,  marginTop: 20,height: 30, width: 30,  zIndex: 5,}}
                        />
                    </TouchableWithoutFeedback>
                    <View style={{ width: screen.width, marginTop: 20, }}>
                        <Image source={image.source} style={{ width: image.image.dimensions.width, height: image.image.dimensions.height }} />
                    </View>
                </View>

            </View>
        );
    }

    _renderPageHeader = (image, index, onClose) => {
        console.log(image);
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
    


    render() {
        return (
            <Layout noPaddingTop allScreenHeader return title="Galerie Photos" navigation={this.props.navigation}>
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
                    />
            </Layout>
        )
    }
}
