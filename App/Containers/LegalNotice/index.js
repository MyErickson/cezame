import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import LayoutContent from '../../Components/LayoutContent/LayoutContent';

export default class LegalNotice extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <LayoutContent title="Mentions Légales" navigation={this.props.navigation}>
                <Text>Mentions légales</Text>
            </LayoutContent>
        )
    }
}
