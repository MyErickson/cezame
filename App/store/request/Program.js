import axios from 'axios';
import {receiveTrips} from "../actionCreator/Program"

export const requestCallProgram=(value)=>{
    const { idTrip , token } = value.action.data
    const { store } = value

    axios.get(`trips/${idTrip}`,{
        headers:{
          'Authorization':"Bearer "+token
        } 
      })
       .then( res =>{
       console.log("TCL: res", res)
    

       store.dispatch(receiveTrips(res.data))

       })
       .catch(err=>{
       console.log("TCL: err", err.response)
       store.dispatch(receiveTrips("error"))
         
       })
}