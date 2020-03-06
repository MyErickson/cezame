import { StyleSheet , Platform } from 'react-native'
import Colors from '../../Themes/Colors';
export const StylesChat = StyleSheet.create({ 
   input:{ 
        backgroundColor: Colors.inputBg,
        borderRadius: 35,  
        paddingHorizontal: 18, 
        borderBottomWidth: 0, 
        height: 50,
        marginBottom:10,
},
    avatar:{ 
        width: 35, 
        height: 35, 
        borderRadius: 35, 
        marginLeft: 10 
    }
})