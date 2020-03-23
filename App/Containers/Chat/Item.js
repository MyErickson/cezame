import React from 'react'
import { View, Text ,Image} from 'react-native'
import { Styles } from '../../Components/Layout/styleLayout';
import { StylesChat } from './styleChat'
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import Moment from 'moment';
import Colors from '../../Themes/Colors';
import { Avatar  } from 'react-native-elements';
import Images from '../../Themes/Images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const Item = ({
    item,
    idUser
    
   
   
} ) => { 
    const { user } = item
    console.log(" item",  item)
    console.log(" idUser",  idUser)
   
    return (
        <View 
        key={item && item["@id"]}
        style={[AppStyles.style.flex, { marginHorizontal: 0, alignItems: "flex-end", marginVertical: 15 }]}
        >
            {user &&  user.id !== idUser &&
                    <Image
                    style={[StylesChat.avatar]}
                    source={ user && user.avatar.contentUrl ? { uri: user.avatar.contentUrl} : Images.devProfil}
                     />
                   
            }
            {item && 
            <View style={{ 
                backgroundColor:user &&  user.id == idUser ? "#DCEDD6" : "#FFEECB", 
                borderRadius: 15,
                borderBottomRightRadius:  user &&  user.id == idUser? 0 : 15, 
                borderBottomLeftRadius:  user &&  user.id == idUser? 15 : 0, 
                paddingVertical: 10, paddingHorizontal: 25,
                marginLeft: user && user.id == idUser ? 25 : 10, 
                width: '80%'
            }}>
                <Text 
                style={[Font.style.normal,
                 {flexShrink: 1, color: user && user.id == idUser? "#181D37" :"#4D3A15"}]}>
                    {item && item.content}
                </Text>

                <View style = {{ flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0" }}>
                        {Moment(item.createdAt).format("DD/MM -  H[h]mm")}
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0",}}>
                        {`${user && user.firstName ?user.firstName:"Anonyme" }`}
                    </Text>
                </View>
            </View>
            }
            { user && user.id === idUser && 
             
                <Image
                style={[StylesChat.avatar]}
                source={  user && user.avatar.contentUrl ? { uri: user.avatar.contentUrl } : Images.devProfil}
                 />
            }
        </View>
    )
}

export default Item
