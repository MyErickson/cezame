import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

const Styles = StyleSheet.create({
    imageContainer : {
        flex : 1,
    },
    backgroundLanding : {
        width: "100%",
        height: 260,
        backgroundColor: Colors.generalBackground,
        
        paddingVertical: 40,
        position: 'absolute',
        bottom: -10,
    }
});


export default Styles;