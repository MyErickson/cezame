/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Program from './index'

// Action Creators

import { callTrips ,callDaySteps} from '../../store/actionCreator/Program';
import { info_user} from '../../store/actionCreator/Parameters'

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    trip_User:state.trip_User,
    infoUser:state.info_User,
    info_Token:state.info_Token
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  
  callTrips:(data)=>{
    dispatch(callTrips(data))
  },
  callDaySteps :(data)=>{
    dispatch(callDaySteps(data) )
  },
  info_user:(data)=>{
    dispatch(info_user(data))
  }

});

 const ContainerProgram = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Program);



/**
 * Export
 */
export default ContainerProgram ;