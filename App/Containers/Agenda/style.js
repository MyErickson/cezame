import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    dateContainer: {
        backgroundColor: 'white', 
        borderRadius: 15, 
        marginHorizontal: 25, 
        marginVertical: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9, 
    },
    dateTitle: {
        backgroundColor: 'white', 
        shadowColor: "#000",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15, 
        paddingHorizontal: 18, paddingVertical: 15,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    dateContent: {
        paddingHorizontal: 18,
        paddingVertical: 20,
        marginBottom:10
    }
});