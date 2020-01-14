import axios from 'axios';
import {info_user } from "../actionCreator/Parameters"


export const requestParam=(value)=>{

    const { id , token } = value.action.data
    const { store } = value

    axios.get(`users/${id}`,{
        headers:{
          'Authorization':"Bearer "+token
        } 
      })
       .then( res =>{

       store.dispatch(info_user(res.data))

       })
       .catch(err=>{
       console.log("TCL: err", err.response)
         
       })
}