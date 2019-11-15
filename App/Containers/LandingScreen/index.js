import React, { Component } from 'react';
import { Text, View, Button, ActivityIndicator, Image} from 'react-native';
import Style from './StyleLandingScreen';


export default class LandingScreen extends Component {
    render() {
        return (
            <View>
                <View style>
                    <Image
                        style={{width: 153, height: 187}}
                        //source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                        source={require('../../Assets/Images/cezame_RVB.png')}
                    />
                </View>
                <Text>  
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Officiis enim voluptates voluptatem, eligendi minima reprehenderit. 
                    Illo doloribus ipsa voluptates minus dolore magnam earum perspiciatis, 
                    dignissimos illum blanditiis repellat eveniet a cupiditate nostrum voluptatum mollitia amet in? 
                    Rem, nobis. Illum, nisi.    
                </Text>
                <Button onPress={() => alert('What ?! you wake me up !')} title="Press Me" />
            </View>
        )
    }
}
