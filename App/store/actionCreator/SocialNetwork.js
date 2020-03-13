import { GET_SOCIAL_NETWORK ,SOCIAL_NETWORK  } from "../reducer"

export const getSocialNetwork =()=>({
    type:GET_SOCIAL_NETWORK,

})

export const social_network  =(data)=>({
    type:SOCIAL_NETWORK,
    data
})