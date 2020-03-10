/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import SideMenu from './Sidemenu'
import { callTrips } from '../store/actionCreator/Program';
// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  callTrips:(data)=>{
    dispatch(callTrips(data))
    },

});

 const ContainerSideMenu  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu );



/**
 * Export
 */
export default ContainerSideMenu  ;