/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import UploadImage  from './UploadImage'

// Action Creators
import { callTrips ,callDaySteps} from '../../../store/actionCreator/Program';

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    info_Token:state.info_Token


});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

 const ContainerUploadImage  = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadImage) ;

export default ContainerUploadImage 