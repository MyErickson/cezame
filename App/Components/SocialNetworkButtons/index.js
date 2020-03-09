import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight ,Linking,Text} from 'react-native';
import { Icon } from  'react-native-elements';
import  Styles  from './style';
import  Colors  from '../../Themes/Colors'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob';

export default class SocialNetwork extends Component {

    state = {
        socialNetwork:undefined
    }




    componentDidMount(){
        this.getSocials()
    }


    getSocials =()=>{
        const { tokenConnection, infoUser} = this.props
        console.log("SocialNetwork -> getSocials -> infoUser", infoUser)
     

        axios.get(`https://cezame-dev.digitalcube.fr/api/socials`)
        .then( res =>{
        console.log("SocialNetwork -> getSocials -> res", res)
        this.setState({
            socialNetwork:res.data["hydra:member"] 
        })

        }).catch( err =>{
        console.log("SocialNetwork -> getSocials -> err", err)

        })

    }

    render() {
       const { socialNetwork} = this.state
    //    console.log("SocialNetwork -> render -> socialNetwork", socialNetwork)
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
