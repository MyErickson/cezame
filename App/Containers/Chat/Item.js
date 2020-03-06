import React from 'react'
import { View, Text } from 'react-native'
import { Styles } from '../../Components/Layout/styleLayout';
import { StylesChat } from './styleChat'
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import Moment from 'moment';
import Colors from '../../Themes/Colors';
import { Avatar , Image } from 'react-native-elements';
import Images from '../../Themes/Images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const Item = ({
    item,
    idUser
   
   
}) => { 
    const { user } = item
   
    return (
        <View 
        key={item && item["@id"]}
        style={[AppStyles.style.flex, { marginHorizontal: 0, alignItems: "flex-end", marginVertical: 15 }]}
        >
            {item && user.id !== idUser && 
                    <Avatar 
                    style={[StylesChat.avatar,{ backgroundColor: Colors.primary}]}
                    rounded 
                    title="C"
                    source={ item && user.avatar&&{ uri:  user.avatar.contentUrl}}
                     />
            }
            {item && 
            <View style={{ 
                backgroundColor:item &&  user.id == idUser ? "#DCEDD6" : "#FFEECB", 
                borderRadius: 15,
                borderBottomRightRadius: item && user.id == idUser? 0 : 15, 
                borderBottomLeftRadius: item && user.id == idUser? 15 : 0, 
                paddingVertical: 10, paddingHorizontal: 25,
                marginLeft: item &&  user.id == idUser ? 25 : 10, 
                width: '80%'
            }}>
                <Text 
                style={[Font.style.normal,
                 {flexShrink: 1, color:item &&  user.id == idUser? "#181D37" :"#4D3A15"}]}>
                    {item && item.content}
                </Text>

                <View style = {{ flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0" }}>
                        {Moment(item.createdAt).format("DD/MM -  H[h]mm")}
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0",}}>
                        {`${user.firstName}`}
                    </Text>
                </View>
            </View>
            }
            {item && user.id == idUser && 
             
                <Avatar 
                style={[StylesChat.avatar,{ backgroundColor: Colors.primary}]}
                rounded 
                title="C"

                source={{ uri: item && user.avatar && user.avatar.contentUrl}}
                 />
            }
        </View>
    )
}

export default Item
