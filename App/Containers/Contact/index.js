import React, { Component, useRef } from 'react';
import { Text, View, Dimensions, KeyboardAvoidingView,ScrollView,StatusBar   } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
const screen = Dimensions.get("window");
import { Styles } from './styleContact'

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
        <View style={Styles.containerItem}>
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
          
                 <StatusBar translucent backgroundColor={Colors.rightColor} />

                <KeyboardAvoidingView  behavior="padding" enabled  keyboardVerticalOffset={10} style={{flex: 1,flexDirection: 'column',justifyContent: 'center'}}>  
                <ScrollView    
                    style={{ marginHorizontal: 0 }}
                    showsVerticalScrollIndicator = {false}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                >
                
                    <View >
                        <View style={{ width: screen.width-50, alignSelf: "center" ,marginTop:15}}>
                            <Text style={{ fontSize: 20,fontWeight:"bold", textAlign: "center",marginBottom:15 }}>Une question ? Besoin d'information ?</Text>
                            <Text style={{ fontSize: 16, textAlign: "center" ,marginBottom:10}}>Nous vous accompagnons durant votre seminaire</Text>
                            <Text style={{ fontSize: 12, textAlign: "center",marginBottom:10 }}>Contacts utiles</Text>
                        </View>
                        <FlatList data={data} renderItem={({ item }) => 
                            <Item item={item} />
                        } />
                    
                        <View style={{ width: screen.width-75, alignSelf: "center" ,marginBottom:15}}>
                            <Input 
                                label="Commentaire" 
                                multiline
                                numberOfLines={6}
                                label="Commentaire"
                                textAlignVertical="top"
                                labelStyle={Styles.labelStyle}
                                inputStyle={Styles.inputStyle}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                containerStyle={{ marginTop: 15 }}
                            />
                            <Button 
                                title="Envoyer" 
                                onPress={() => { this.sendMessage() }}
                                buttonStyle={Styles.buttonStyle} 
                            />
                        </View>
                    </View>
            
             
                </ScrollView>
                </KeyboardAvoidingView>
                <Modal isVisible={this.state.visibleModal}>
                    <View style={Styles.viewModal}>
                        <Text style={{ textAlign: "center", fontSize: 18 }}>Votre message a bien été transmis.</Text>
                        <Button 
                            title="OK"
                            buttonStyle={Styles.buttonStyle}
                            onPress={() => { this.setState({ visibleModal: false }) }}
                        />
                    </View>
                </Modal>
          
            </Layout>
        )
    }
}
