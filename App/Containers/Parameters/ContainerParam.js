/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Parameters from './index'

// Action Creators

import { initialize_State,info_user,getUsers} from '../../store/actionCreator/Parameters'

const mapStateToProps = (state, ownProps) => ({
    infoUser:state.info_User,
    info_Token:state.info_Token,
    tokenConnection:state.tokenConnection,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({

      initialize_State:()=>{
          dispatch(initialize_State())
      },
      info_user:(data)=>{
          dispatch(info_user(data))
      },
      getUsers:(data)=>{
        dispatch(getUsers(data))
      },
});

const ContainerParameters   = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Parameters );



/**
* Export
*/
export default ContainerParameters ;