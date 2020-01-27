/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Agenda from './index'

// Action Creators


const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    infoUser:state.info_User,
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

 const ContainerAgenda = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agenda);



/**
 * Export
 */
export default ContainerAgenda   ;