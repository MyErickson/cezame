/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Layout from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);



/**
 * Export
 */
export default ContainerLayout ;