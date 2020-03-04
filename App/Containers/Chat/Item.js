import React from 'react'
import { View, Text } from 'react-native'
import { Styles } from '../../Components/Layout/styleLayout';
import { StylesChat } from './styleChat'
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import Moment from 'moment';
import Colors from '../../Themes/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const Item = ({
    item,
    idUser
   
}) => { console.log("  item",   item)
    return (
        <View style={[AppStyles.style.flex, { marginHorizontal: 0, alignItems: "flex-end", marginVertical: 15 }]}>
            {item && item.user.id !== idUser && 
                <View style={[StylesChat.avatar,{ backgroundColor: Colors.primary}]}></View>
            }
            <View style={{ 
                backgroundColor:item &&  item.user.id == idUser ? "#DCEDD6" : "#FFEECB", 
                borderRadius: 15,
                borderBottomRightRadius: item && item.user.id == idUser? 0 : 15, 
                borderBottomLeftRadius: item && item.user.id == idUser? 15 : 0, 
                paddingVertical: 10, paddingHorizontal: 25,
                marginLeft: item &&  item.user.id == idUser ? 25 : 10, 
                width: '80%'
            }}>
                <Text style={[Font.style.normal, {flexShrink: 1, color:item &&  item.user.id == idUser? "#181D37" : "#4D3A15"}]}>{item && item.content}</Text>
                <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0" }}>{Moment(item.date).format("DD/MM -  H[h]mm")}</Text>
            </View>
            {item && item.user.id == idUser && 
                <View style={[StylesChat.avatar,{ backgroundColor: Colors.primary}]}></View>
            }
        </View>
    )
}

export default Item
