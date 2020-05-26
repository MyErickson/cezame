import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Font from '../../Themes/Font';
import { Icon } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
const screen = Dimensions.get("window");


export default class ModalPlace extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#F6F6F6', borderRadius: 15, width: screen.width-85 }}>
                <View style={[AppStyles.style.flex, { alignItems: "center", paddingLeft:35,width: screen.width-85 }]}>
                    <Icon name="arrow-left" type="simple-line-icon" hitSlop={{top: 10, bottom: 10, left: 0, right: 0}} size={16} onPress={this.props.onBack} />
                    <Text style={[Font.style.h3, { paddingLeft: 5, paddingVertical: 15 }]}>{this.props.title}</Text>
                </View>
                
                <View style={{ paddingLeft: 50, backgroundColor: "white", paddingTop: 15, paddingBottom: 25,borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
                    <Text>{this.props.description}</Text>
                </View>
            </View>
        )
    }
}
