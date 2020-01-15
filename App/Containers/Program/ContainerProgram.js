/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Program from './index'

// Action Creators
import {responseConnection} from '../../store/actionCreator/Login'

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    trip_User:state.trip_User
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerProgram = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Program);



/**
 * Export
 */
export default ContainerProgram ;