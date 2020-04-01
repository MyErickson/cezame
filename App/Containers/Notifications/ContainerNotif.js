/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Notifications from './index'

// Action Creators
import { get_Notif } from "../../store/actionCreator/Notification"

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
    all_Notif:state.all_Notif


});

const mapDispatchToProps = (dispatch, ownProps) => ({
get_Notif:(data) =>{
  dispatch(get_Notif(data))
}

});

 const ContainerNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);



/**
 * Export
 */
export default ContainerNotifications   ;