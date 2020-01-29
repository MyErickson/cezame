import { GET_INFO_HOTEL, INFO_HOTEL} from '../reducer'

export const info_hotel=(data)=>({
    type:INFO_HOTEL,
    data
})

export const getInfo_hotel=(data)=>({
    type:GET_INFO_HOTEL,
    data
})