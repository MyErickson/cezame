import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from  'react-native-elements';
import { socialNetwork } from "../../Configs/General"
import  Styles  from './style';
import  Colors  from '../../Themes/Colors'

export default class SocialNetwork extends Component {
    render() {
        return (
            <View style={Styles.container}>
                { socialNetwork.map((value,key)=>{
                    return(
                        <TouchableOpacity key={key}>
                            <Icon
                            raised={this.props.white ? false : true }
                            name={value.name}
                            type='font-awesome'
                            color={this.props.white ? "white" : value.color}
                            onPress={() => console.log(value.name)} 
                            containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 15 : 0 }}
                            size={18}
                            />
                     </TouchableOpacity>
                    )
                })}
                

                
            </View>
        )
    }
}
