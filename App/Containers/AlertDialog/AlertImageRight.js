import React from 'react'
import { View,  Platform} from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


const AlertImageRight=({
    alertVisible,
    closeAlert,
    messageAlert,
    style,
    imageRight,
    close
})=>{

    return (
      
         
        <Dialog.Container 
        visible={alertVisible}
        headerStyle={{borderRadius:30 }}
        contentStyle={{width:wp("90%"),borderRadius:14,justifyContent:"space-between",marginBottom:Platform.OS==='ios'?30:0}}
        buttonSeparatorStyle={{color:"black"}} >
        
          <Dialog.Description style={style? [Style.register,{color:"green"}] :[Style.register,{color:"red"}] }>
             {messageAlert }
            
          </Dialog.Description>

          {close ?  <Dialog.Button  label="ok" onPress={()=>closeAlert('alertVisibleImage')}/>  :
          <View style={Platform.OS === "ios" ? Style.containerButtonIos :Style.containerButtonAndroid}>
                  <Dialog.Button 
                  bold={true} 
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"#0B6ACA"}]} 
                  color="white"
                  label= "J'accepte"
                  onPress={()=> imageRight(true) } />
                
                  <Dialog.Button 
                  bold={true}  
                  color="white"
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"grey"}]} 
                  label="Je n'accepte pas" 
                  onPress={()=>imageRight(false)} />
              </View>
          
    }
        </Dialog.Container>
     
    )
}

 

export default AlertImageRight