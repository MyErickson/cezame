import React, { Component } from 'react'
import { View,  Platform} from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class AlertDialog extends Component{

  state={
    textValue:""
  }

  textPrecision=(text)=>{
    
     this.setState({textValue:text})
  }


  render(){

      const {closeAlert,
        alertVisible,
        messageAlert,
        style,
        yesConfirm,
        askPrecision,
        alertConfirm =false,
        logOutOrRegister,
        } = this.props
      

        return (
      
         
            <Dialog.Container 
            visible={alertVisible}
            headerStyle={{borderRadius:30 }}
            contentStyle={{width:wp("90%"),borderRadius:14,justifyContent:"space-between",marginBottom:Platform.OS==='ios'?30:0}}
            buttonSeparatorStyle={{color:"black"}} >
            
              <Dialog.Description style={style? [Style.register,{color:"green"}] :[Style.register,{color:"red"}] }>
                { messageAlert ? messageAlert:" "  }
                
              </Dialog.Description>
            

               {alertConfirm ? 
              (<View style={Platform.OS === "ios" ? Style.containerButtonIos :Style.containerButtonAndroid}>
                  <Dialog.Button 
                  bold={true} 
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"#0B6ACA"}]} 
                  color="white"
                  label= { askPrecision ? "Envoyer" : "Oui"}
                  onPress={()=> yesConfirm(logOutOrRegister) } />
                
                  <Dialog.Button 
                  bold={true}  
                  color="white"
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"grey"}]} 
                  label="Annuler" 
                  onPress={closeAlert} />
              </View>) 
              
              :
              
             <Dialog.Button  label="ok, j'ai compris" onPress={()=>closeAlert('alertVisible')}/> 
              
               }
        
            </Dialog.Container>
         
        )
    }
}
 

export default AlertDialog