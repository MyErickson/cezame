import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

const Styles = StyleSheet.create({
    imageContainer : {
        justifyContent:'center',
        alignItems:'center', 
        marginTop: 70, 
        marginBottom : 30
    },
    backgroundLanding : {
        width: "100%",
        height: 260,
        backgroundColor: Colors.generalBackground,

        paddingVertical: 40,
        position: 'absolute',
        bottom: -10,
    },
    buttonContainer:{
        justifyContent:"space-around",
        minHeight: 250,
        zIndex: 1,
        paddingHorizontal: 40,
        marginHorizontal: 15
    },

});


export default Styles;