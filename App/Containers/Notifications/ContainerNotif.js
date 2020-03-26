/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Notifications from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,


});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);



/**
 * Export
 */
export default ContainerNotifications   ;