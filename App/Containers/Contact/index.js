import React, { Component, useRef, Fragment } from 'react';
import { Text,
    View, 
    Dimensions, 
    FlatList, 
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    SafeAreaView  ,
    TouchableOpacity, 
    Linking  } from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import Colors from '../../Themes/Colors';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import Communications from 'react-native-communications';
import Modal from "react-native-modal";
const screen = Dimensions.get("window");
import { Styles } from './styleContact'
import RNFetchBlob from 'rn-fetch-blob';





import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
const data = [
    {
        id: 0,
        name: "Digitalcube",
        tel: "+33 1 34 48 75 63"
    },
    {
        id: 1,
        name: "Matthieu Delavallade",
        tel: "+33 1 58 17 01 01"
    },
    {
        id: 3,
        name: "Sandrice LOUYER (BPCE)",
        tel: "00 33 6 20 93 81 95"
    },
]

function Item({item}) {
    return(
        <TouchableOpacity  onPress={()=> Communications.phonecall(item.tel, true)} >
        <View style={Styles.containerItem}  >
            <View >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                <View  style={[AppStyles.style.flex, {alignItems: "center", marginTop: 2}]}
                
                >
                    <Icon  name="phone-square" type="font-awesome" color={Colors.primary} size={14} containerStyle={{ marginRight: 5 }} />
                    <Text style={{ color: "#A0A0A0" }}>{item.tel}</Text>
                </View>
            </View>
            <Icon name="phone-square" type="font-awesome" color={Colors.secondary} size={28} />
        </View>
        </TouchableOpacity>
    )
}

export default class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            prenom:"", 
            email: "", 
            tel: "", 
            comments:"",
            password: "",
            visibleModal: false
        };
        this.input ={};
    }

    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    sendMessage = () => {
        // this.setState({ visibleModal: true })
        const { name , email , tel ,comments,prenom } = this.state
    RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/contact-mail`,{
      headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
      },[
        {
        name:'lastname',
        data: name
        },
        {
        name:'firstname',
        data:prenom
        },
        {
        name:'email',
        data:email
        }
        ,
        {
        name:'content',
        data:comments
        }
        ,
        // {
        // name:'phone',
        // data:tel
        // }
     
      ]).then((res) => {
      console.log("Contact -> sendMessage -> res", res)
    
            this.setState({
                visibleModal:true
            })
      })
      .catch((err) => {
      console.log("TCL: MyQuestions -> onStopRecord -> err", err)
      })
    
    }
    
    closeModal=()=>{
        this.setState({ 
            visibleModal: false ,
            name: "",
            prenom:"", 
            email: "", 
            tel: "", 
            comments:"",
        }) 
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
                    // keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'
                    contentInsetAdjustmentBehavior="always"
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
                                name='name'
                                containerStyle={{ marginTop: 10 }}
                                onChange={(e)=>this.UpdateInputToState(e) }
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
                                onChange={(e)=>this.UpdateInputToState(e) }
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
                                onChange={(e)=>this.UpdateInputToState(e) }
                                onSubmitEditing={() => { this.inputFocus("tel") }}
                                blurOnSubmit={false}
                                returnKeyType="next"
                            />

                            <Input 
                                ref = { text=>this.input.tel = text}
                                name='tel'
                                placeholder="Portable"
                                placeholderTextColor="#CCCCCC"
                                containerStyle={{ marginTop: 10 }}
                                onChange={(e)=>this.UpdateInputToState(e) }
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
                                onChange={(e)=>this.UpdateInputToState(e) }
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
                        <Text style={{ textAlign: "center", fontSize: 18 }}>Votre commentaire a bien été envoyé.</Text>
                        <Button 
                            title="OK, merci "
                            buttonStyle={Styles.buttonStyle}
                            onPress={() => { this.closeModal()}}
                        />
                    </View>
                </Modal>
          
            </ContainerLayout>
        )
    }
}
