import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");


export const Styles = StyleSheet.create({
    header:{
        position: 'absolute',  
        paddingHorizontal: 25, 
        marginTop: 45, 
        flexDirection: "row",  
        alignItems: "center" ,
     
    },
    title:{ 
        textAlign: "center", 
        color: "white", 
        fontSize: 18, 
        marginLeft: 45 
    },
    iconParam:{ 
        width: 35, 
        height: 35, 
        borderRadius: 35, 
        backgroundColor: Colors.dark, 
        marginLeft: 15 
    },
    containerMenu:{ 
        height:50,
        backgroundColor: Colors.lightSecondary, 
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 25,
        bottom: 0
}
    
    
})