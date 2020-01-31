
/**
 * Initial State
 */
const initialState = {
  tokenConnection: undefined,
  info_User:undefined,
  trip_User:undefined,
  info_Token:undefined,
  info_hotel:undefined,
};

/**
 * Types
 */
export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const INITITALIZE_STATE = 'INITITALIZE_STATE';
export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const  CALL_TRIPS = " CALL_TRIPS";
export const GET_USERS = 'GET_USERS';
export const INFO_USER ='INFO_USER';
export const DECODE_TOKEN = 'DECODE_TOKEN';
export const GET_INFO_HOTEL = 'GET_INFO_HOTEL';
export const INFO_HOTEL = 'INFO_HOTEL '
/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESPONSE_CONNECTION:

      return {
        ...state,
        tokenConnection:action.responseConnection,

      };

    case INFO_USER :
      
        return {
          ...state,
          info_User:action.data,
  
        
        };
    
    case RECEIVE_TRIPS :

     return {
       ...state,
       trip_User:action.data,

     
     };

     case  DECODE_TOKEN:

      return {
        ...state,
        info_Token:action.data,
 
      
      };
 
      case INFO_HOTEL:
        return { 
          ...state,
          info_hotel:action.data
        }

    case INITITALIZE_STATE:
    
      return {
        tokenConnection: undefined,
        info_User:undefined,
        trip_User:undefined,
        info_Token:undefined,
        info_hotel:undefined
      };


    default:
      return state;
  }
};



/**
 * Action Creators
 */

/**
 * Selectors
 */

/*
 * Export
 */
export default reducer;

