import React, { Component, useRef } from 'react';
import { Text, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
const screen = Dimensions.get("window");


const data = [
    {
        id: 0,
        name: "Sandrice LOUYER (BPCE)",
        tel: "00 33 6 20 93 81 95"
    },
    {
        id: 1,
        name: "Sandrice LOUYER (BPCE)",
        tel: "00 33 6 20 93 81 95"
    },
    {
        id: 3,
        name: "Sandrice LOUYER (BPCE)",
        tel: "00 33 6 20 93 81 95"
    },
]

function Item({item}) {
    return(
        <View style={{ 
            backgroundColor: "white",
            width: screen.width-50,
            borderRadius: 15,
            shadowColor: "#000",
            alignSelf: "center",
            paddingVertical: 13,
            paddingHorizontal: 15,
            marginVertical: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
         }}>
            <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                <View style={[AppStyles.style.flex, {alignItems: "center", marginTop: 2}]}>
                    <Icon name="phone-square" type="font-awesome" color={Colors.primary} size={14} containerStyle={{ marginRight: 5 }} />
                    <Text style={{ color: "#A0A0A0" }}>{item.tel}</Text>
                </View>
            </View>
            <Icon name="phone-square" type="font-awesome" color={Colors.secondary} size={28} />
        </View>
    )
}

export default class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "John Doe", 
            email: "email@address.com", 
            tel: "06478754852", 
            password: "mot de passe",
            checked: false,
            visibleModal: false
        }
    }

    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    sendMessage = () => {
        this.setState({ visibleModal: true })
    }

    render() {
        return (
            <Layout return title="Contact" navigation={this.props.navigation}>
                <KeyboardAvoidingView  behavior={'position'} keyboardVerticalOffset={70} style={{flex: 1}}>  
                    <View>
                        <View style={{ width: screen.width-50, alignSelf: "center" }}>
                            <Text style={{ fontSize: 22, textAlign: "center" }}>Une question ? Besoin d'information ?</Text>
                            <Text style={{ fontSize: 18, textAlign: "center" }}>Nous vous accompagnons durant votre seminaire</Text>
                            <Text style={{ fontSize: 15, textAlign: "center" }}>Contact utiles</Text>
                        </View>
                        <FlatList data={data} renderItem={({ item }) => 
                            <Item item={item} />
                        } />
                    
                        <View style={{ width: screen.width-75, alignSelf: "center" }}>
                            <Input 
                                label="Commentaire" 
                                multiline
                                numberOfLines={6}
                                label="Commentaire"
                                textAlignVertical="top"
                                labelStyle={{ fontWeight: "normal", color: Colors.text, fontSize: 18, marginBottom: 8  }}
                                inputStyle={{ backgroundColor: "#F1F1F1", borderWidth: 1, borderRadius: 5, borderColor: "#DCDCDC" }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                containerStyle={{ marginTop: 15 }}
                            />
                            <Button 
                                title="Envoyer" 
                                onPress={() => { this.sendMessage() }}
                                buttonStyle={{ backgroundColor: Colors.lightPrimary, borderRadius: 35, paddingVertical: 10, marginTop: 25, width: screen.width-125, alignSelf: "center" }} 
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <Modal isVisible={this.state.visibleModal}>
                    <View style={{ backgroundColor: "white", width: screen.width-50, paddingVertical: 50, borderRadius: 15 }}>
                        <Text style={{ textAlign: "center", fontSize: 18 }}>Votre message a bien été transmis.</Text>
                        <Button 
                            title="OK"
                            buttonStyle={{ backgroundColor: Colors.lightPrimary, borderRadius: 35, paddingVertical: 10, marginTop: 25, width: screen.width-125, alignSelf: "center" }} 
                            onPress={() => { this.setState({ visibleModal: false }) }}
                        />
                    </View>
                </Modal>
            </Layout>
        )
    }
}
