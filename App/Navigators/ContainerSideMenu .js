/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import SideMenu from './Sidemenu'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerSideMenu  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu );



/**
 * Export
 */
export default ContainerSideMenu  ;