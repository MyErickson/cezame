import React, { Component, useRef } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input } from 'react-native-elements';
import Font from '../../Themes/Font';
import MapView, { Marker, Callout } from 'react-native-maps';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import { FlatList } from 'react-native-gesture-handler';
const screen = Dimensions.get("window");


export default class Parameters extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Layout roundHeader return title="Parameters" navigation={this.props.navigation}>
                <Image source={Images.bgImage} style={{ width: 100, height: 150 }} />
                <Input label='Mon identifiant' />
                <Input label='Mon adresse e-mail' />
                <Input label='Tel.' />
                <Input label='Changer mon mot de passe' />
            </Layout>
        )
    }
}
