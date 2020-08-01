import {RESPONSE_CONNECTION,DECODE_TOKEN} from '../reducer'  

export const responseConnection = (responseConnection) => ({
    type: RESPONSE_CONNECTION,
    responseConnection,
  
  });

export const decode_Token =(data)=>({
  type:DECODE_TOKEN,
  data
})
