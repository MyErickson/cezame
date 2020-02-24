/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */

import CurrentImage from './CurrentImage'

// Action Creators
import { callTrips ,callDaySteps} from '../../../store/actionCreator/Program';

const mapStateToProps = (state, ownProps) => ({
    tokenConnection:state.tokenConnection,
    info_Token:state.info_Token


});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

 const ContainerCurrentImage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentImage);
export default ContainerCurrentImage;
