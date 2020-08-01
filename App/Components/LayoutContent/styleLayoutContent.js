import {StyleSheet,Dimensions} from 'react-native'
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");

export const Styles = StyleSheet.create({
    title:{ 
        marginTop: 20, 
        textAlign: "center", 
        color: "white", 
        fontSize: 18, 
        fontWeight: "bold" 
    },
    containerChildrend:{
        width: '100%', 
        height: screen.height-100, 
        backgroundColor: "white", 
        borderRadius: 50, 
        marginTop: -50, 
        paddingHorizontal: 35, 
        paddingTop: 30 }
})