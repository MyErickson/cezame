/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Places from './index'

// Action Creators
import {responseConnection} from '../../store/actionCreator/Login'
import { callTrips } from '../../store/actionCreator/Program';

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    trip_User:state.trip_User,
    infoUser:state.info_User,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  
  callTrips:(data)=>{
    dispatch(callTrips(data))
  },

});

 const ContainerPlaces = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Places );



/**
 * Export
 */
export default ContainerPlaces  ;