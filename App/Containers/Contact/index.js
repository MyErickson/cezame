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
import Modal from "react-native-modal";
const screen = Dimensions.get("window");
import { Styles } from './styleContact'
import RNFetchBlob from 'rn-fetch-blob';
import Item from "./Item/Item"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



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
            trip_User:[],
            textModal:"",
            visibleModal: false
        };
        this.input ={};
    }

    componentDidMount(){
        const { trip_User } =this.props

        this.setState({
            trip_User:trip_User && trip_User.users
        })
    }
    
    UpdateInputToState = (event) => {
        const name = event._targetInst.pendingProps.name;
        this.setState({ [name] :  event.nativeEvent.text})
    }

    sendMessage = (login) => {
        if(login){
            this.requestForUser()
        }else{
            this.requestUserLogin ()
        }

    }
    requestUserLogin = ()=>{
        const { tokenConnection } = this.props
        const { comments } =this.state
        console.log("Contact -> requestUserLogin -> comments", comments.trim())
        if(comments.trim()){
            RNFetchBlob.fetch("post",`https://cezame-dev.digitalcube.fr/api/send-comment`,{
                Authorization : "Bearer "+tokenConnection,
                headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
                },[
                  {
                  name:'comment',
                  data: comments
                  },
           
                ]).then((res) => {
                console.log("Contact -> sendMessage -> res", res)
              
                      this.setState({
                          visibleModal:true,
                          textModal:"Votre commentaire a bien été envoyé."
                      })
                })
                .catch((err) => {
                console.log("TCL: MyQuestions -> onStopRecord -> err", err)
                })
              
        }else{
            this.setState({
                visibleModal:true,
                textModal:"Le message n'a pas etait envoyer, un commentaire est requis."
            })
        }
       
    }

    requestForUser=()=>{
        const { name , email , tel ,comments,prenom } = this.state
        if(name.trim() && email.trim() && tel.trim() && comments.trim() && prenom.trim()){
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
            {
            name:'phone',
            data:tel
            }
         
          ]).then((res) => {
          console.log("Contact -> sendMessage -> res", res)
        
                this.setState({
                    visibleModal:true,
                    textModal:"Votre commentaire a bien été envoyé."

                })
          })
          .catch((err) => {
          console.log("TCL: MyQuestions -> onStopRecord -> err", err)
          })
        }else{
            this.setState({
                visibleModal:true,
                textModal:"Le message n'a pas etait envoyer. Les champs doivent être remplis."
            })
        
        }
        
        
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
        const { trip_User , user,name , prenom , email , tel , comments ,textModal} =this.state
        const { tokenConnection } =this.props
        const keybord = Platform.OS === "ios" ? hp("5%") : hp("-65%")
        const behavior = Platform.OS === "ios" ? "padding":""

        return (
            <ContainerLayout return title="Contact" style={{flex:1, }} navigation={this.props.navigation}>
          
                 <StatusBar translucent backgroundColor={Colors.rightColor} />

                 {/* <KeyboardAvoidingView  behavior="height" enabled  keyboardVerticalOffset={keybord} style={{flex:1}} >   */}
                <ScrollView    
                    style={{ marginHorizontal: 0 ,marginBottom:0,}}
                    containerStyle={{justifyContent:"space-between",}}
                    showsVerticalScrollIndicator = {false}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'
                    contentInsetAdjustmentBehavior="always"
                >
                <KeyboardAwareScrollView
                extraScrollHeight={30}
                >
                    <View >
                    <View style={{ width: screen.width-50, alignSelf: "center" ,marginTop:15,marginBottom:10}}>
                            <Text style={Styles.textTitle}>Une question ? Besoin d'information ?</Text>
                    { tokenConnection ?

                     
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
                    { tokenConnection && 
                
                     
                        <SafeAreaView style={{flex: 1}}>
                            <Text style={Styles.textContact}>Contacts utiles</Text>
                            <FlatList data={trip_User} keyExtractor={item => item.id} renderItem={({ item }) => 
                          
                                 <Item  item={item} />
                            } />
                 
                        </SafeAreaView>
                        }
                        <View style={{ width: screen.width-75, alignSelf: "center" ,marginVertical:20}}>
                        { !tokenConnection && 
                        <>
                              <Input 
                                placeholder="Nom"
                                name='name'
                                value={name}
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
                                value={prenom}
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
                                value={email}
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
                                value={tel}
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
                                value={comments}
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
                                
                                onPress={() => {!tokenConnection ? this.sendMessage(true) : this.sendMessage(false)}}
                                buttonStyle={Styles.buttonStyle} 
                            />
                        </View>
                    </View>
            
                    </KeyboardAwareScrollView>
                </ScrollView>
                {/* </KeyboardAvoidingView> */}
                <Modal isVisible={this.state.visibleModal}>
                    <View style={Styles.viewModal}>
                    <Text style={{ textAlign: "center", fontSize: 18 }}>{textModal}</Text>
                        <Button 
                            title="Ok, merci "
                            buttonStyle={Styles.buttonStyle}
                            onPress={() => { this.closeModal()}}
                        />
                    </View>
                </Modal>
          
            </ContainerLayout>
        )
    }
}
