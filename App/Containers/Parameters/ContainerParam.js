/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Parameters from './index'

// Action Creators
import {responseConnection} from '../../store/actionCreator/Login';
import { getUsers } from '../../store/actionCreator/Parameters'

const mapStateToProps = (state, ownProps) => ({
    info_User:state.info_User
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

const ContainerParameters   = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Parameters );



/**
* Export
*/
export default ContainerParameters ;