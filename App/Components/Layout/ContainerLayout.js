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