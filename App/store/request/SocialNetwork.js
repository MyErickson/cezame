import axios from 'axios'
import {social_network } from '../actionCreator/SocialNetwork'

export  const requestSocials =(value)=>{

    const { store ,action } = value

        axios.get(`https://cezame-dev.digitalcube.fr/api/socials`)
        .then( res =>{
        console.log("SocialNetwork -> getSocials -> res", res)
      
            store.dispatch(social_network(res.data["hydra:member"])) 
      

        }).catch( err =>{
        console.log("SocialNetwork -> getSocials -> err", err)

        })

    }