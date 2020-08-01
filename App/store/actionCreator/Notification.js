import { GET_NOTIF, ALL_NOTIF,COUNT_NOTIF} from '../reducer'

export const all_Notif=(data)=>({
    type:ALL_NOTIF,
    data
})

export const get_Notif=(data)=>({
    type:GET_NOTIF,
    data
})
export const count_Notif=(data)=>({
    type:COUNT_NOTIF,
    data
})