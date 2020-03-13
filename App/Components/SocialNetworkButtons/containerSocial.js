/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import  SocialNetwork  from './index'

// Action Creators
import { getSocialNetwork } from '../../store/actionCreator/SocialNetwork'

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
    social_Network:state.social_Network
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSocialNetwork:()=>{
    dispatch(getSocialNetwork())
  }
});

 const ContainerSocialNetwork = connect(
  mapStateToProps,
  mapDispatchToProps,
)( SocialNetwork );



/**
 * Export
 */
export default ContainerSocialNetwork ;