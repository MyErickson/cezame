import axios from 'axios';

 import {  CALL_TRIPS,GET_USERS, GET_INFO_HOTEL ,CALL_DAY_STEPS} from './reducer'

import {requestParam} from './request/Parameters'
import {requestCallProgram , requestDaySteps } from './request/Program'
import {requestHotel} from './request/Hotel'

 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
  
    //match(/"(.*?)"/)[1] recuperer le token sans les ""(string)
   
    
    axios.defaults.baseURL = 'https://cezame-dev.digitalcube.fr/api/'
    next(action);
    console.log("TCL: action", action)
     
    switch(action.type){
      case  GET_USERS:
        next(action)

        let valueUser = new FormData
        valueUser.action = action
        valueUser.store = store
        
        requestParam(valueUser) 
     
         break;

     
            
      case  CALL_TRIPS:
        next(action)
    
        let valueTrips = new FormData
        valueTrips.action = action
        valueTrips.store = store
      
        requestCallProgram(valueTrips)
      
          break;
      
      case  GET_INFO_HOTEL:
        next(action)

        let valueHotel = new FormData
        valueHotel.action = action
        valueHotel.store = store
        
        requestHotel(valueHotel) 
     
         break;
      
      case  CALL_DAY_STEPS:
      next(action)

      let valueDaySteps = new FormData
      valueDaySteps.action = action
      valueDaySteps.store = store
      
      requestDaySteps(valueDaySteps) 
    
        break;



    }

  };
  
  export default ajaxMiddleware;