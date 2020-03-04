/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import  SocialNetwork  from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerSocialNetwork = connect(
  mapStateToProps,
  mapDispatchToProps,
)( SocialNetwork );



/**
 * Export
 */
export default ContainerSocialNetwork ;