import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import ContainerLayoutContent from '../../Components/LayoutContent/ContainerLayoutContent';

export default class AboutUs extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ContainerLayoutContent title="A propos" navigation={this.props.navigation}>
                <Text>Qui sommes-nous ?</Text>
            </ContainerLayoutContent>
        )
    }
}
