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

   getNotif=()=>{
 
        const { infoUser, tokenConnection} = this.props

        axios.get(`users/${infoUser.id}/user_notifications`,{
            headers:{
                'Authorization':"Bearer "+tokenConnection
            } 
        }).then(res=>{
        console.log("Notifications -> getNotif -> es", res)
            this.setState({
                allNotifs:res.data["hydra:member"]
            }) 
            
        }).catch(err=>{
        console.log("Notifications -> getNotif -> err", err)
            
        })
    
   }

    putNotif=(item)=>{
        const {tokenConnection} = this.props
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
