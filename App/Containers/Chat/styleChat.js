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
    inputAndroid:{
        backgroundColor: "white",
        borderBottomWidth: 0, 
        height: 50,
        marginBottom:0,
        
    },
    styleAndroid:{
        marginBottom:20,
        backgroundColor:Colors.inputBg,
        borderRadius:35,
        paddingLeft:15,
        paddingHorizontal:5,
        paddingRight:2,
        height: 50.1,

    },
    avatar:{ 
        width: 35, 
        height: 35, 
        borderRadius: 35, 
        marginLeft: 10 
    }
})