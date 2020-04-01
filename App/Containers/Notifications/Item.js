import React from 'react';
import { View, Text} from 'react-native';

import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import AppStyles from '../../Themes/AppStyles';
import Moment from 'moment';

const  Item=({item}) =>{
 
    return(
        <View style={{ 
            flexDirection: "row",  alignItems: "center",justifyContent:"space-around",
            paddingVertical: 25, 
            backgroundColor: item && item.seen === true ? "white" : "#F0F0F0",
            borderBottomColor: "#ECECEC",
            borderBottomWidth: 1
        }}>
            
            <View style={{ width: 300, marginRight: 50,}}>
                <Text style={{ flexShrink: 1, fontWeight: item && item.seen ? "normal" : "bold" ,paddingLeft:20}}>
                    {item.notification && item.notification.content}
                </Text>
                <View style={[AppStyles.style.flex, { alignItems: "center",paddingLeft:20 }]}>
                    <Icon name="access-time" size={12} containerStyle={{ marginRight: 5 }} color={"#B6B6B6"} />
                    <Text style={{color: '#B6B6B6' }}>
                        Le {item.notification && Moment(item.notification.createdAt).format("DD/MM -  H[h]mm")}
                    </Text>
                </View>
            </View>
            <View style={{flexDirection:"column",alignItems:"center",paddingRight:10 ,width:100}}>
                <View style={{ 
                    backgroundColor: item && item.seen !== true ? "white" : Colors.lightPrimary, 
                    width: 30, height: 30, borderRadius: 35, 
                    borderColor: item && item.seen === true ? "#979797" : Colors.lightPrimary,
                    borderWidth: 1,
                    justifyContent: "center", alignItems: "center"
                }}>
                
                    <Icon name="check" color={ "white"} size={22} />
                
                </View>
                {item.seen === true && (
                    <Text style ={{fontSize:10}}>Marquer comme lu</Text>
                )}
            </View>
        </View>
    )
}

export default Item