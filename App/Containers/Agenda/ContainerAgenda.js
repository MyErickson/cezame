/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Agenda from './index'

// Action Creators
import { callTrips ,callDaySteps} from '../../store/actionCreator/Program';
import { getUsers} from '../../store/actionCreator/Parameters';

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
    trip_User:state.trip_User,
    day_steps:state.day_steps

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  callTrips:(data)=>{
    dispatch(callTrips(data))
  },
  callDaySteps :(data)=>{
    dispatch(callDaySteps(data) )
  },  getUsers:(data)=>{
    dispatch(getUsers(data))
    },

});

 const ContainerAgenda = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agenda);



/**
 * Export
 */
export default ContainerAgenda   ;