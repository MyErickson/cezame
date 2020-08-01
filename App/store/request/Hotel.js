import axios from 'axios';
import {info_hotel} from "../actionCreator/Hotel"


export const requestHotel=(value)=>{

    const { id , token } = value.action.data
    const { store } = value

    axios.get(`users/${id}`,{
        headers:{
          'Authorization':"Bearer "+token
        } 
      })
       .then( res =>{
        // console.log("TCL: es", res)
       store.dispatch(info_hotel(res.data))

       })
       .catch(err=>{
       console.log("TCL: err", err.response)
         
       })
}