/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import LandingScreen  from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({

    tokenConnection:state.tokenConnection,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

const ContainerLandingScreen  = connect(
 mapStateToProps,
 mapDispatchToProps,
)(LandingScreen);



/**
* Export
*/
export default ContainerLandingScreen ;