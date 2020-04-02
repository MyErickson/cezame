/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import LandingScreen  from './index'

// Action Creators
import {responseConnection ,decode_Token } from '../../store/actionCreator/Login';
import { getUsers } from '../../store/actionCreator/Parameters';
import { callTrips } from '../../store/actionCreator/Program';
import { getSocialNetwork } from '../../store/actionCreator/SocialNetwork'

const mapStateToProps = (state, ownProps) => ({

    tokenConnection:state.tokenConnection,
    social_Network:state.social_Network
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    responseConnection:(token)=>{
        dispatch(responseConnection(token))
      },
    
    getUsers:(data)=>{
    dispatch(getUsers(data))
    },
    callTrips:(data)=>{
    dispatch(callTrips(data))
    },
    decode_Token :(data)=>{
        dispatch(decode_Token(data))
      },
    getSocialNetwork:()=>{
      dispatch(getSocialNetwork())
    },
    decode_Token :(data)=>{
      dispatch(decode_Token(data))
    }
});

const ContainerLandingScreen  = connect(
 mapStateToProps,
 mapDispatchToProps,
)(LandingScreen);



/**
* Export
*/
export default ContainerLandingScreen ;