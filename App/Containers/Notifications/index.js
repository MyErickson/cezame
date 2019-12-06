import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Layout from '../../Components/Layout';
import { Icon } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import AppStyles from '../../Themes/AppStyles';


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

function Item({item}) {
    return(
        <View style={{ 
            flexDirection: "row", justifyContent: "center", alignItems: "center",
            paddingVertical: 25, 
            backgroundColor: item.see == true ? "white" : "#F0F0F0",
            borderBottomColor: "#ECECEC",
            borderBottomWidth: 1
        }}>
            <View style={{ backgroundColor: Colors.secondary, width: 50, height: 50, borderRadius: 35, marginRight: 25 }}></View>
            <View style={{ width: 180, marginRight: 50 }}>
                <Text style={{ flexShrink: 1, fontWeight: item.see ? "normal" : "bold" }}>{item.text}</Text>
                <View style={[AppStyles.style.flex, { alignItems: "center" }]}>
                    <Icon name="access-time" size={12} containerStyle={{ marginRight: 5 }} color={"#B6B6B6"} />
                    <Text style={{color: '#B6B6B6' }}>Le {item.date} - {item.hours}</Text>
                </View>
            </View>
            <View style={{ 
                backgroundColor: item.see == true ? "white" : Colors.lightPrimary, 
                width: 30, height: 30, borderRadius: 35, 
                borderColor: item.see == true ? "#979797" : Colors.lightPrimary,
                borderWidth: 1,
                justifyContent: "center", alignItems: "center"
            }}>
                <Icon name="check" color={item.see == true ? "#979797" : "white"} size={22} />
            </View>
        </View>
    )
}

export default class Notifications extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Layout return title="Notification" navigation={this.props.navigation}>
                <FlatList 
                    data={data}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => console.log(" récupère l'id de la notification et change la valeur see en true. ")}>
                            <Item item={item}  />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </Layout>
        )
    }
}
