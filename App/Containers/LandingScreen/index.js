import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import Styles from './StyleLandingScreen';
import SocialNetworkButtons from '../../Components/SocialNetworkButtons';
import Colors from '../../Themes/Colors';
import { Button } from 'react-native-elements';
import Images from '../../Themes/Images';



export default class LandingScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            
            <View style={{ flex: 1 , backgroundColor: Colors.generalBackground }}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop: 70, marginBottom : 30}}>
                    <Image
                        style={{ width: 153, height: 187 }}
                        source={Images.logo}
                    />
                </View>
                <View style={{justifyContent:"space-around", minHeight: 250, zIndex: 11,paddingLeft : 45, paddingRight : 45, marginHorizontal: 15}}>
                    <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.darkPrimary }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => navigate('AboutUs')} 
                        title="Qui sommes nous ?" 
                    />
                    <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.primary }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => navigate('Login', {name: 'Login'})} 
                        title="Accès client" 
                    />
                    <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.lightPrimary }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => alert('What ?! Contact')}
                        title="Contact" 
                    />
                    <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.secondary }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => navigate('News', {name: 'News'})} 
                        title="Actualités" 
                    />
                    <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: Colors.lightSecondary }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => alert('What ?! Mentions légales')}
                        title="Mentions légales" 
                    />
                    {/* <Button 
                        buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: "blue" }} 
                        containerStyle= {{ paddingVertical: 5 }} 
                        onPress={() => navigate('Agenda', {name: 'Agenda'})} 
                        title="Agenda" 
                    /> */}
                </View>
                
                <ImageBackground source={Images.bgImage} style={Styles.backgroundLanding}>
                    <View style={{ position : "absolute", bottom : 20, left : 0, right : 0,zIndex: 10}}>
                        <SocialNetworkButtons />
                    </View>
                </ImageBackground>
            </View>

        )
    }
}
