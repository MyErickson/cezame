/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import LayoutContent from './LayoutContent'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerLayoutContent  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutContent);



/**
 * Export
 */
export default ContainerLayoutContent ;