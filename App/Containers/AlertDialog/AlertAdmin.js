import React, { Component } from 'react'
import { View,  Platform} from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


const AlertAdmin =({
    alertVisible,
    closeAlert,
    messageAlert
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

          
        <Dialog.Button  label="ok, j'ai compris" onPress={closeAlert}/> : <Dialog.Button label=""/> 
          
    
        </Dialog.Container>
     
    )
}

 

export default AlertAdmin