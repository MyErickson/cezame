import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import ContainerLayout from '../../Components/Layout/ContainerLayout';

 class Hotel extends Component {
    render() {
        return (
            <ContainerLayout title="Mon Programme" navigation={this.props.navigation}>
                <ScrollView>
                    <Text> textInComponent </Text>
                </ScrollView>
            </ContainerLayout>
        )
    }
}

export default Hotel
