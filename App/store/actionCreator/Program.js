import { RECEIVE_TRIPS , CALL_TRIPS} from "../reducer"

export const receiveTrips = (data) =>({
    type:RECEIVE_TRIPS,
    data
})

export const callTrips = (data) =>({
    type:CALL_TRIPS,
    data
})