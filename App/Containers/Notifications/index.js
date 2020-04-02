import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Layout from '../../Components/Layout';
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import AppStyles from '../../Themes/AppStyles';
import Item from "./Item"
import axios from "axios"




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
    const { info_Token, tokenConnection , get_Notif } = this.props
        if(info_Token){
            let data = {}
            data.id = info_Token.id
            data.token = tokenConnection
            get_Notif(data)
        }

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
                <View style={{flexDirection:"row", marginRight:10,justifyContent:"flex-end",height:20,backgroundColor:"rgba(52,52,52,alpha)" }}>
                    <Text style={{fontSize: 13,color:'blue'}}>Marquer comme lu</Text>
                </View>
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
