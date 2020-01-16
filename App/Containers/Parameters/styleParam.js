import { StyleSheet,Dimensions , Platform} from 'react-native';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");

export const Styles = StyleSheet.create({
    lineagradient:{ 
        width: 455,
        height: 155,
        marginLeft:35,
        marginBottom:80,
        alignSelf: "center" ,
        borderBottomEndRadius:180,
        borderBottomStartRadius:180,
        borderBottomLeftRadius:180,
        borderBottomRightRadius:180 
        },
    viewLinea:{ 
        width: 100, 
        height: 140, 
        marginHorizontal: 100  ,
        borderRadius: 10,
        marginTop:25, 
        alignSelf: "flex-end" ,
        position:"absolute",
        // borderBottomEndRadius:130,
        borderBottomRightRadius:Platform.OS ==="android"?78:120 ,
        borderBottomStartRadius:0,
         },
    containerImage:{ 
        width: 225,
        height: 225, 
        borderRadius: 45,
        backgroundColor:"blue", 
        alignSelf: "center" ,
        position:"absolute" 
    },
    labelInput:{ 
        fontSize: 15, 
        margin: 0, 
        color: Colors.dark, 
        fontWeight: "normal" 
    },
    inputStyle:{ 
        padding: 0, 
        marginTop: 15, 
        fontSize: 15, 
        color: "#6B6B6B" 
    },
    containterStyle:{ 
        borderBottomWidth: 1, 
        borderBottomColor: "#C6C6C6", 
        marginTop: 5 
    },
    inputContainerStyle:{ 
        borderBottomWidth: 0,
        height: 25, 
        marginBottom: 10 
    },
    buttonStyle:{ 
  
        borderRadius: 35, 
        paddingVertical: 10, 
        width: screen.width-125, 
        alignSelf: "center" 
    },
    containerCheckbox:{ 
        backgroundColor: "transparent", 
        borderWidth: 0, 
        padding: 0, 
        margin: 0, 
        marginTop: 15, 
        marginBottom: 10
    }

});