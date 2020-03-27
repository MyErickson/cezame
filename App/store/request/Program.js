import axios from 'axios';
import {receiveTrips , receivedaySteps } from "../actionCreator/Program"

export const requestCallProgram=(value)=>{
    const { idTrip , token } = value.action.data
    const { store } = value

    axios.get(`trips/${idTrip}`,{
        headers:{
          'Authorization':"Bearer "+token
        } 
      })
       .then( res =>{
      //  console.log("TCL: res tripuser tipuser", res)
    

       store.dispatch(receiveTrips(res.data))

       })
       .catch(err=>{
       console.log("TCL: err", err.response)
       store.dispatch(receiveTrips("error"))
         
       })
}


export const requestDaySteps = (value)=>{
    const { idTrip , token } = value.action.data
    const { store } = value
  

    axios.get(`trips/${idTrip}/day_steps`,{
      headers:{
        'Authorization':"Bearer "+token
      } 
    })
    .then( res =>{
      // console.log("TCL: requestDaySteps -> store", res)


    store.dispatch(receivedaySteps(res.data["hydra:member"]))

    })
    .catch(err=>{
    console.log("TCL: eresresresres", err.response)
    store.dispatch(receivedaySteps ("error"))
      
    })
}