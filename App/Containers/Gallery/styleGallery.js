import { StyleSheet , Platform } from 'react-native'
import Colors from '../../Themes/Colors';
export const Styles = StyleSheet.create({
    footerIconDownload:{ 
    
        backgroundColor: "rgba(0,0,0,.5)", 
        borderRadius: 25, 
        width: 43, 
        height: 43, 
        alignSelf: "center", 
        justifyContent: "center", 
        alignContent: "center" },

    animetedFooter:{
        backgroundColor: 'rgba(255,255,255,.5)', 
        width: 200, 
        borderRadius: 10, 
        alignSelf: "center" },

    footerContainer:{ 
        height: 45, 
        zIndex: -1, 
        backgroundColor: Colors.lightSecondary, 
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 25,
        bottom: Platform.OS ==="android" ? 28 : 5

        },
     containerImage:{
        margin:10,
        borderRadius:10,
        width:"90%",
     }   
})