import React, { Component, useRef, Fragment } from 'react';
import { Text, View, Dimensions, KeyboardAvoidingView,ScrollView,StatusBar,SafeAreaView   } from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
const screen = Dimensions.get("window");
import { Styles } from './styleContact'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
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
        };
        this.input ={};
    }

    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    sendMessage = () => {
        this.setState({ visibleModal: true })
    }
    
    inputFocus=(id)=>{  
        this.input[id].focus()
   }
    render() {
        const keybord = Platform.OS === "ios" ? hp("5%") : hp("-65%")
        const behavior = Platform.OS === "ios" ? "padding":""
        return (
            <ContainerLayout return title="Contact" style={{flex:1, }} navigation={this.props.navigation}>
          
                 <StatusBar translucent backgroundColor={Colors.rightColor} />

                 <KeyboardAvoidingView  behavior="height" enabled  keyboardVerticalOffset={keybord} style={{flex:1}} >  
                <ScrollView    
                    style={{ marginHorizontal: 0 ,marginBottom:0,}}
                    containerStyle={{justifyContent:"space-between",}}
                    showsVerticalScrollIndicator = {false}
                    contentInsetAdjustmentBehavior="automatic"
                >
                
                    <View >
                    <View style={{ width: screen.width-50, alignSelf: "center" ,marginTop:15,marginBottom:10}}>
                            <Text style={Styles.textTitle}>Une question ? Besoin d'information ?</Text>
                    { this.props.tokenConnection ?

                     
                     <Text style={Styles.text}> 
                        Nous vous accompagnons durant votre seminaire
                     </Text>
                

                 :

                    <Fragment>
                        <Text style={{fontSize:22,textAlign: "center" , fontWeight:'bold',marginBottom:10}}>CEZAME</Text>
                        <Text style={Styles.text}> 
                            5 rue Gallieni {"\n"} 92100 Boulogne {"\n"}Téléphone : 01.58.17.01.01 {"\n"}Email: contact@cezame.fr
                        </Text>
                    </Fragment>   
                    }  

                    </View>
                    { this.props.tokenConnection && 
                
                     
                        <SafeAreaView style={{flex: 1}}>
                            <Text style={Styles.textContact}>Contacts utiles</Text>
                            <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => 
                          
                                 <Item  item={item} />
                            } />
                 
                        </SafeAreaView>
                        }
                        <View style={{ width: screen.width-75, alignSelf: "center" ,marginVertical:20}}>
                        { !this.props.tokenConnection && 
                        <>
                              <Input 
                                placeholder="Nom"
                                containerStyle={{ marginTop: 10 }}
                                onSubmitEditing={this.sendMessage}
                                placeholderTextColor="#CCCCCC"
                                onSubmitEditing={() => { this.inputFocus("prenom") }}
                                blurOnSubmit={false}
                                returnKeyType="next"
                                />
                            <Input 
                                ref = { text=>this.input.prenom = text}
                                name='prenom'
                                placeholder="Prénom"
                                containerStyle={{ marginTop: 10 }}
                                onSubmitEditing={this.sendMessage}
                                placeholderTextColor="#CCCCCC"
                                onSubmitEditing={() => { this.inputFocus("email") }}
                                blurOnSubmit={false}
                                returnKeyType="next"
                            />

                            <Input 
                                ref = { text=>this.input.email = text}
                                name='email'
                                placeholder="Email"
                                labelStyle={Styles.labelStyle}
                                placeholderTextColor="#CCCCCC"
                                containerStyle={{ marginTop: 10 }}
                                onSubmitEditing={this.sendMessage}
                                onSubmitEditing={() => { this.inputFocus("tel") }}
                                blurOnSubmit={false}
                                returnKeyType="next"
                            />

                            <Input 
                                ref = { text=>this.input.tel = text}
                                name='tel'
                                placeholder="Portable"
                                placeholderTextColor="#CCCCCC"
                                containerStyle={{ marginTop: 15 }}
                                onSubmitEditing={this.sendMessage}
                                onSubmitEditing={() => { this.inputFocus("comments") }}
                                blurOnSubmit={false}
                                returnKeyType="next"
                            />
                            </>
                        }
                            <Input 
                                ref = { text=>this.input.comments = text}
                                name='comments'
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
                        <Text style={{ textAlign: "center", fontSize: 18 }}>Cette fonctionnalité sera bientot disponible.</Text>
                        <Button 
                            title="OK"
                            buttonStyle={Styles.buttonStyle}
                            onPress={() => { this.setState({ visibleModal: false }) }}
                        />
                    </View>
                </Modal>
          
            </ContainerLayout>
        )
    }
}
