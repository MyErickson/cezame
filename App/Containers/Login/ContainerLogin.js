/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Login from './index'

// Action Creators
import {responseConnection} from '../../store/actionCreator/Login';
import { getUsers } from '../../store/actionCreator/Parameters';
import { callTrips } from '../../store/actionCreator/Program';

const mapStateToProps = (state, ownProps) => ({
  trip_User:state.trip_User 
   
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