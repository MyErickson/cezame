/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Login from './index'

// Action Creators
import {responseConnection,decode_Token } from '../../store/actionCreator/Login';
import { getUsers } from '../../store/actionCreator/Parameters';
import { callTrips } from '../../store/actionCreator/Program';
import { get_Notif } from "../../store/actionCreator/Notification"

const mapStateToProps = (state, ownProps) => ({
  trip_User:state.trip_User ,
  tokenConnection:state.tokenConnection,
  
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
  get_Notif:(data) =>{
    dispatch(get_Notif(data))
  }
  

});

 const ContainerLogin  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);



/**
 * Export
 */
export default ContainerLogin ;