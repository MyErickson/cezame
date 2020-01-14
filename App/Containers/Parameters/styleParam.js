import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
export const Styles = StyleSheet.create({
    lineagradient:{ 
        width: 425,
        height: 125,
        marginBottom:100,
        alignSelf: "center" ,
        borderBottomEndRadius:100,
        borderBottomStartRadius:120,
        borderBottomLeftRadius:120,
        borderBottomRightRadius:100 
        },
    viewLinea:{ 
        width: 150, 
        height: 140, 
        borderRadius: 10,
        backgroundColor:Colors.rightColor,
        marginTop:35, 
        alignSelf: "flex-end" ,
        position:"absolute",
        borderBottomEndRadius:90,
        borderBottomStartRadius:0,
         }
});

