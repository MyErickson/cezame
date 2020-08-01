import { GET_USERS ,INFO_USER,UPATE_USER,INITITALIZE_STATE} from '../reducer'

export const getUsers =(data)=>({
    type:GET_USERS,
    data
})

export const info_user= (data)=>({
    type:INFO_USER,
    data
})

export const update_User=(data)=>({
    type:UPATE_USER,
    data
})

export const initialize_State=()=>({
  type:INITITALIZE_STATE,
})