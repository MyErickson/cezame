import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Layout from '../../Components/Layout';
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import AppStyles from '../../Themes/AppStyles';
import Item from "./Item"
import axios from "axios"


const data = [
    {
      id: 1, 
      text: "Informations de l'opération mis à jour",
      date: "17/19/2019",
      hours: '19h10',
      see: false
    },
    {
        id: 2, 
        text: "Informations de l'opération mis à jour",
        date: "17/19/2019",
        hours: '19h10',
        see: true
    },
    {
        id: 3, 
        text: "Informations de l'opération mis à jour",
        date: "17/19/2019",
        hours: '19h10',
        see: true
    }
]



export default class Notifications extends Component {

    constructor(props){
        super(props);
        this.state = {
            allNotifs:[]
        }

    }

   componentDidMount(){
  
    this.getNotif()
         
   }

   static getDerivedStateFromProps(props,state){ 
       if(props.all_Notif){
        state.allNotifs = props.all_Notif
       }


   }

   getNotif =()=>{
    const { infoUser, tokenConnection , get_Notif } = this.props
    let data = {}
         data.id = infoUser.id
         data.token = tokenConnection
         get_Notif(data)
   }

    putNotif=(item)=>{
        const {tokenConnection,get_Notif} = this.props
        axios.defaults.headers['Authorization']= "Bearer "+tokenConnection;

        if(item.seen !== true ){
            axios.put(`user_notifications/${item.id}`,{
                seen:true
            }).then(res=>{
            console.log("putNotif -> res", res)
            this.getNotif()
    
            }).catch(err=>{
            console.log("putNotif -> err", err.response)
                
            })
        }

    }



    render() {
        const { allNotifs } =this.state

    
       
        return (
            <Layout return title="Notification" navigation={this.props.navigation}>
                <FlatList 
                    data={allNotifs}
                    renderItem={({ item }) => 
                        <TouchableOpacity 
                        onPress={() => this.putNotif(item)}>
                            <Item item={item}  />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </Layout>
        )
    }
}
