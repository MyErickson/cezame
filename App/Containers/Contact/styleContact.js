import { StyleSheet , Dimensions,Platform} from 'react-native'
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");
export const Styles = StyleSheet.create({
    containerItem:{ 
        backgroundColor: "white",
        borderRadius: 15,
        width: screen.width-50,
        shadowColor: "#000",
        alignSelf: "center",
        paddingVertical: 13,
        paddingHorizontal: 15,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
     },
     buttonStyle:{ 
        backgroundColor: 
        Colors.lightPrimary, 
        borderRadius: 35, 
        paddingVertical: 10, 
        marginTop: 25, 
        width: 
        screen.width-125, 
        alignSelf: "center" 
    },
    labelStyle:{ 
        fontWeight: "normal", 
        color: Colors.text, 
        fontSize: 18, 
        marginBottom: 8  
    },
    inputStyle:{ 
        backgroundColor: "#F1F1F1", 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: "#DCDCDC" ,
        marginBottom:Platform.OS === "ios" ?10:0,
    },
    viewModal:{ 
        backgroundColor: "white", 
        width: screen.width-50, 
        paddingVertical: 50, 
        borderRadius: 15 
    },
    textTitle:{ 
        fontSize: Platform.OS === "ios" ?30:20,
        fontWeight:"bold", 
        textAlign: "center",
        marginBottom:Platform.OS === "ios" ?25:15 
    },
    text:{ 
        fontSize: Platform.OS === "ios" ?20:16, 
        textAlign: "center" ,
        marginBottom:Platform.OS === "ios" ?20:10
    },
    textContact:{ 
        fontSize: Platform.OS === "ios" ?16:12, 
        textAlign: "center",
        marginBottom:Platform.OS === "ios" ?20:10 
    }

})
