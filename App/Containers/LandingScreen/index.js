import React, { Component } from 'react';
import { Text, View, ScrollView,Button, ActivityIndicator, Image} from 'react-native';

import Styles from './StyleLandingScreen';

import SocialNetworkButtons from '../../Components/SocialNetworkButtons';

export default class LandingScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{padding : 20}}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop: 30, marginBottom : 30}}>
                    <Image
                        style={{ width: 153, height: 187 }}
                        source={require('../../Assets/Images/cezame_RVB.png')}
                    />
                </View>
                <View style={{justifyContent:"space-around", minHeight: 300, paddingLeft : 45, paddingRight : 45}}>
                    <Button onPress={() => alert('What ?! QUI SOMMES-NOUS ?')} title="QUI SOMMES-NOUS ?" />
                    <Button onPress={() => navigate('Login', {name: 'Login'})} title="Accès client" />
                    <Button onPress={() => navigate('News', {name: 'News'})} title="Actualités" />
                    <Button onPress={() => navigate('Agenda', {name: 'Agenda'})} title="Agenda" />
                    <Button onPress={() => alert('What ?! Contact')} title="Contact" />
                    <Button onPress={() => alert('What ?! Mentions légales')} title="Mentions légales" />
                </View>
                <View>
                    <SocialNetworkButtons />
                </View>
            </View>
        )
    }
}
