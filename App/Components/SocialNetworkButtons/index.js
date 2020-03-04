import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight ,Linking} from 'react-native';
import { Icon } from  'react-native-elements';
import  Styles  from './style';
import  Colors  from '../../Themes/Colors'
import axios from 'axios'


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
        console.log("SocialNetwork -> getSocials -> err", err.response)

        })

    }
    
    render() {
       const { socialNetwork} = this.state
       console.log("SocialNetwork -> render -> socialNetwork", socialNetwork)
        return (
            <View style={Styles.container}>
                {socialNetwork && socialNetwork.map((value)=>{
                console.log("SocialNetwork -> render -> value", value["@id"])
                    return(
                        <TouchableOpacity key={value["@id"]}>
                            <Icon
                            raised={this.props.white ? false : true }
                            name={value.iconName}
                            type='font-awesome'
                            color={this.props.white ? "white" : Colors[value.iconName]}
                            onPress={() => Linking.openURL(value.link)} 
                            containerStyle={{ marginHorizontal: this.props.white ? 15 : 0, marginVertical: this.props.white ? 50 : 0 }}
                            size={18}
                            />
                     </TouchableOpacity>
                    )
                })}
                

                
            </View>
        )
    }
}
