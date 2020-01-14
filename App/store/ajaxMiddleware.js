import axios from 'axios';

 import {  CALL_TRIPS,GET_USERS } from './reducer'

import { requestParam} from './request/Parameters'


 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
  
    //match(/"(.*?)"/)[1] recuperer le token sans les ""(string)
   
    
    axios.defaults.baseURL = 'https://cezame-dev.digitalcube.fr/api/'
    next(action);
    console.log("TCL: action", action)
     
    switch(action.type){
      case  GET_USERS:
        next(action)

        const value = new FormData
        value.action = action
        value.store = store
        console.log("TCL:  value",  value)

        requestParam(value) 
     
         break;

     
            
        case  CALL_TRIPS:
          next(action)
          console.log("TCL: action", action)
            axios.get(`trips/${action.data.id}`,{
              headers:{
                'Authorization':"Bearer "+action.data.token
            } 
            })
             .then( res =>{
             console.log("TCL: res", res)

             })
             .catch(err=>{
             console.log("TCL: err", err.response)
               
             })
       
           break;



    }

  };
  
  export default ajaxMiddleware;