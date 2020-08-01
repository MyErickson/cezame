/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import Gallery  from './index'

// Action Creators
import {responseConnection,decode_Token } from '../../store/actionCreator/Login';

const mapStateToProps = (state, ownProps) => ({
  trip_User:state.trip_User ,
  info_Token:state.info_Token,
  tokenConnection:state.tokenConnection,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

 const ContainerGallery   = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gallery);



/**
 * Export
 */
export default ContainerGallery ;