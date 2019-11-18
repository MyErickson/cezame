import React, { Component } from 'react';
import { Text, View, ScrollView,Button, ActivityIndicator, Image} from 'react-native';
import Style from './StyleLandingScreen';


export default class LandingScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image
                        style={{ width: 153, height: 187 }}
                        source={require('../../Assets/Images/cezame_RVB.png')}
                    />
                </View>
                <View>
                    <Button onPress={() => alert('What ?! QUI SOMMES-NOUS ?')} title="QUI SOMMES-NOUS ?" />
                    <Button onPress={() => navigate('Login', {name: 'Login'})} title="Accès client" />
                    <Button onPress={() => navigate('News', {name: 'News'})} title="Actualités" />
                    <Button onPress={() => alert('What ?! Contact')} title="Contact" />
                    <Button onPress={() => alert('What ?! Mentions légales')} title="Mentions légales" />
                </View>
            </View>
        )
    }
}
