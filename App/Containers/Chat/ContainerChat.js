/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Chat from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({

    tokenConnection:state.tokenConnection,
    infoToken:state.info_Token
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

const ContainerChat      = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Chat  );



/**
* Export
*/
export default ContainerChat  ;