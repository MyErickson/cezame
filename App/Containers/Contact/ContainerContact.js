/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Contact from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({

    tokenConnection:state.tokenConnection,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

const ContainerContact     = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Contact  );



/**
* Export
*/
export default ContainerContact  ;