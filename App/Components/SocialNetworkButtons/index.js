import React, { PureComponent } from 'react';
import { View, TouchableOpacity, TouchableHighlight ,Linking,Text} from 'react-native';
import { Icon } from  'react-native-elements';
import  Styles  from './style';
import  Colors  from '../../Themes/Colors'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob';

export default class SocialNetwork extends PureComponent {

    state = {
        socialNetwork:undefined
    }




    render() {
       const { socialNetwork} = this.props
    
     
        return (
            <View style={Styles.container}>
                {socialNetwork && socialNetwork.map((value)=>{
               
                
                    return(
           
                            <TouchableOpacity
                            key={value["@id"]}
                            onPress={()=>Linking.openURL(value.link)}
                            style={{margin:1}}
                            >
                         
                            <Icon
                                raised={this.props.white ? false : true }
                                name={value.iconName}
                                type='font-awesome'
                                color={this.props.white ? "white" : Colors[value.iconName]}
                                containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 50 : 0,zIndex:1 }}
                                size={18}
                                />
                            </TouchableOpacity>
                     
                    )
                })}
                

                
            </View>
        )
    }
}
