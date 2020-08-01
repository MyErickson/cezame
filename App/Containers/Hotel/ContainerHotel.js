/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
* Local import
*/

import Hotel from './Hotel'

// Action Creators


const mapStateToProps = (state, ownProps) => ({

    tokenConnection: state.tokenConnection,
    trip_User: state.trip_User,
    info_hotel: state.info_hotel,
    trip_User:state.trip_User,
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({


});

const ContainerHotel    = connect(
 mapStateToProps,
 mapDispatchToProps,
)(Hotel );



/**
* Export
*/
export default ContainerHotel  ;