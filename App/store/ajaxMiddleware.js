import axios from 'axios';

// import { } from './reducer'




 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
  
    //match(/"(.*?)"/)[1] recuperer le token sans les ""
   
    
    axios.defaults.baseURL = 'https://cezame-dev.digitalcube.fr/api/'
    next(action);
    console.log("TCL: action", action)
     
    switch(action.type){

     
            
        // case SEND_MESSAGE_USER:
        //     next(action)

       
        //     break;



    }

  };
  
  export default ajaxMiddleware;