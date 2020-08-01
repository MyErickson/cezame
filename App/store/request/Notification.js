import axios from 'axios';
import {all_Notif,count_Notif} from "../actionCreator/Notification"


export const requestNotif=(value)=>{

    const { id , token } = value.action.data
    const { store } = value

    axios.get(`users/${id}/user_notifications`,{
        headers:{
            'Authorization':"Bearer "+token
        } 
    }).then(res=>{
    // console.log("Notifications -> getNotif -> es", res)
  
        store.dispatch(all_Notif(res.data["hydra:member"]))
        if(res.data["hydra:member"]){
            store.dispatch(count_Notif(res.data["hydra:member"].filter(value => value.seen === false).length))
        
        }
        
    }).catch(err=>{
    console.log("Notifications -> getNotif -> err", err)
        
    })
}


