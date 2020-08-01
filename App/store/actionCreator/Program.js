import { RECEIVE_TRIPS , CALL_TRIPS , CALL_DAY_STEPS , DAY_STEPS} from "../reducer"

export const receiveTrips = (data) =>({
    type:RECEIVE_TRIPS,
    data
})

export const callTrips = (data) =>({
    type:CALL_TRIPS,
    data
})

export const callDaySteps = (data )=>({
    type:CALL_DAY_STEPS,
    data
})

export const receivedaySteps = (data )=>({
    type:DAY_STEPS,
    data
})