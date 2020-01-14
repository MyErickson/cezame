import { GET_USERS ,INFO_USER} from '../reducer'

export const getUsers =(data)=>({
    type:GET_USERS,
    data
})

export const info_user= (data)=>({
    type:INFO_USER,
    data
})