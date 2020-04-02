import React from 'react'
import { View, Text ,TouchableOpacity  } from 'react-native'
import Colors from '../../../Themes/Colors';
import AppStyles from '../../../Themes/AppStyles';
import Communications from 'react-native-communications';
import { Styles } from '../styleContact'
import { Icon} from 'react-native-elements';

const Item = ({item}) => {
console.log("Item -> item", item)

    return (
        
        <TouchableOpacity  onPress={()=> Communications.phonecall(item.phone, true)} >
          {  item &&
            <View style={Styles.containerItem}  >
            <View >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.firstName}</Text>
               
                <View  style={[AppStyles.style.flex, {alignItems: "center", marginTop: 2}]}>
                    <Icon  name="phone-square" type="font-awesome" color={Colors.primary} size={14} containerStyle={{ marginRight: 5 }} />
                    <Text style={{ color: "#A0A0A0" }}>{item.phone.toString()}</Text>
                </View>  
            </View>
            <Icon name="phone-square" type="font-awesome" color={Colors.secondary} size={28} />
        </View>
          }
      
        </TouchableOpacity>
    )
}

export default Item
