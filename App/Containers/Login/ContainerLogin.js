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
import { getUsers } from '../../store/actionCreator/Parameters'

const mapStateToProps = (state, ownProps) => ({
    
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  responseConnection:(token)=>{
    dispatch(responseConnection(token))
  },

  getUsers:(data)=>{
    dispatch(getUsers(data))
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