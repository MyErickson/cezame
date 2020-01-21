import { StyleSheet  } from 'react-native'
import Colors from '../../Themes/Colors';
export const Styles = StyleSheet.create({
    footerIconDownload:{ 
        zIndex: 1, 
        backgroundColor: "rgba(0,0,0,.5)", 
        borderRadius: 25, 
        width: 45, 
        height: 45, 
        alignSelf: "center", 
        justifyContent: "center", 
        alignContent: "center" },

    animetedFooter:{
        backgroundColor: 'rgba(255,255,255,.5)', 
        width: 200, 
        borderRadius: 10, 
        alignSelf: "center" },

    footerContainer:{ 
        height:50,
        zIndex: -1, 
        backgroundColor: Colors.lightSecondary, 
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 25,
        bottom: 22 

        }
})