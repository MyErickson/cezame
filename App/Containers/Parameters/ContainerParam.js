/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Parameters from './index'

// Action Creators

import { initialize_State} from '../../store/actionCreator/Parameters'

const mapStateToProps = (state, ownProps) => ({
    info_User:state.info_User,
    info_Token:state.info_Token,
    tokenConnection:state.tokenConnection,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({

      initialize_State:()=>{
          dispatch(initialize_State())
      },
      info_user:(data)=>{
          dispatch(info_user(data))
      }
});

const ContainerParameters   = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Parameters );



/**
* Export
*/
export default ContainerParameters ;