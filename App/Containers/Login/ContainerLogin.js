/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Login from './index'

// Action Creators
import {responseConnection} from '../../store/actionCreator/Login'

const mapStateToProps = (state, ownProps) => ({
    receiveResponseConnection:state.receiveResponseConnection,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  responseConnection:(token)=>{
    dispatch(responseConnection(token))
  },

});

 const ContainerLogin  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);



/**
 * Export
 */
export default ContainerLogin ;