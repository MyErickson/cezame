
/**
 * Initial State
 */
const initialState = {
  tokenConnection: undefined,
  
};

/**
 * Types
 */
export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const INITITALIZE_STATE = 'INITITALIZE_STATE'
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


    case INITITALIZE_STATE:
    
      return {

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

