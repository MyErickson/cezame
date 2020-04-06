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
import { getUsers,initialize_State } from '../../store/actionCreator/Parameters';
import { callTrips } from '../../store/actionCreator/Program';
import { getSocialNetwork } from '../../store/actionCreator/SocialNetwork'
import { get_Notif } from "../../store/actionCreator/Notification"
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
    },
    initialize_State:()=>{
      dispatch(initialize_State())
  },
  get_Notif:(data) =>{
    dispatch(get_Notif(data))
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