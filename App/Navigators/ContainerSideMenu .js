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
import { getSocialNetwork } from '../store/actionCreator/SocialNetwork'

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
    social_Network:state.social_Network
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  callTrips:(data)=>{
    dispatch(callTrips(data))
    },
    getSocialNetwork:()=>{
      dispatch(getSocialNetwork())
    }
});

 const ContainerSideMenu  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu );



/**
 * Export
 */
export default ContainerSideMenu  ;