import React, { Component } from 'react';
import { Text, View, 
    KeyboardAvoidingView , 
    Dimensions, 
    FlatList, 
    Platform ,
    Animated,
    TouchableOpacity,
    SafeAreaView} from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input ,Avatar } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import ImagePicker from 'react-native-image-picker';
import Moment from 'moment';
import NavigationService from '../../Services/NavigationService';
import { Styles } from '../../Components/Layout/styleLayout';
import { StylesChat } from './styleChat'
import axios from "axios"
import Item from "./Item"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const screen = Dimensions.get("window");
import io from "socket.io-client"



const optionsImagePicker = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


var chat
const socketAddress = "https://live.cezame-dev.digitalcube.fr";
const socketPort = "5005";



export default class Chat extends Component {
  constructor(props){
    super(props);
      this.state={
        avatarSource: undefined,
        messages:[],
        idUser:undefined, 
        message:null,
        socket:undefined
      }
      this.viewAnimated = new Animated.Value(0);
      this.startAnimated=false
  }


    componentDidMount(){
        const { tokenConnection} =this.props
       let  socket = io(socketAddress + ':' + socketPort, {
            query: {
                token: tokenConnection,
            }
        });
        
        this.getMessage(socket)
       this.setState({
           socket
       })
        

    } 
  
    componentWillUnmount(){
        console.log("Chat -> componentWillMount -> componentWillMount")
        const { socket } =  this.state
        socket.disconnect(true);
    }

    getMessage=(socket)=>{
        const { infoToken,tokenConnection} =this.props
        socket.on('auth', (status) => {
            if (!status.isAuth) {
                console.log(status.error);
            } else {
                let messages = status.messages
                this.setState({
                    messages:status.messages
                })
               console.log("Chat -> getMessage -> status.messages", status)
            }
        });
        
      
    }


    _uploadImage = () => {
        ImagePicker.launchImageLibrary(optionsImagePicker, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.setState({
                avatarSource: source,
                });
            }
        });
    }
    
    viewTopBarModo =()=>{
 
            return (
                <Animated.View
                style={{
                    ...this.props.style,
                    opacity:this.viewAnimated
                }}
                // onPress={() => NavigationService.navigate("Contact")}
                >
                    {this.topBarModo()}
                </Animated.View>
            )
       
    }
 

    
    showTopBarModo =()=>{
        
        const { viewAnimated,startAnimated } = this
      

        if(!startAnimated){
          
            this.startAnimated=true
            Animated.timing(
                viewAnimated ,
                {
                  toValue: 1,
                  duration: 2000,
                }
              ).start(()=>{
        
                Animated.timing(
                    viewAnimated ,
                    
                    {
                      delay:1500,
                      toValue: 0,
                      duration: 1000,
                    }
                  ).start(()=>{
                      setTimeout(()=>{
                      
                         
                            this.startAnimated=false
                        
                      },2000)
                   
                  });
              });
        }

        

    }


    topBarModo=()=>{
  
       
                return (
                    <View style={[AppStyles.style.flex, { width:"100%",alignItems: "center", backgroundColor: Colors.lightPrimary, paddingVertical: 15, paddingHorizontal: 25, justifyContent: "space-between",position:"absolute" }]}>
                        <View style={[AppStyles.style.flex, { alignItems: "center" }]}>
                            <Avatar 
                            style={{width: 35, height: 35, backgroundColor: Colors.primary, borderRadius: 35, marginRight: 15 }}
                            rounded 
                            title="M"
                            />

                            <View onPress={() => NavigationService.navigate("Contact")}>
                                <Text style={Font.style.h2}>Contact</Text>
                                <Text style={{ color: Colors.white }}>Les Moderateurs/admins</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => NavigationService.navigate("Contact")}>
                            <Icon 
                                underlayColor="none"
                                name="mail"
                                color={Colors.white}
                                
                                size={25}
                                
                            />
                        </TouchableOpacity>
                </View>
                )
    }

    inputMesssage=(msg)=>{

        if( msg.trim()){
            this.setState({
                message:msg
            })
        }else{
            this.setState({
                message:null
            })
        }
    }

    sendMessage = ()=>{
        const { message ,socket ,messages} =this.state
        const { tokenConnection } = this.props

        socket.emit('post_message', {content: message });
        socket.on('post_message_status', (status) => {
    
            let isPosted = status.isPosted;
            
            if (!isPosted) {
                console.log(status.error);
            } else {
                console.log("Chat -> sendMessage -> status", status)
               this.setState({
                   messages:[...messages,status.message],
                   message:undefined
               })
               
            }
        });
    }

    render() {
     
        const { messages ,idUser,message} = this.state
       
        return (
            
        <Layout noPaddingTop chat return title="Messagerie instantanée" navigation={this.props.navigation}>
             <KeyboardAwareScrollView 
             keyboardOpeningTime={50}
             extraScrollHeight={30}
             keyboardDismissMode='on-drag'
             scrollEnabled={false}
             enableAutomaticScroll={true}
             keyboardShouldPersistTaps="always"
             showsVerticalScrollIndicator = {false}
             style={{marginBottom:5}}
         
             >
                
            {this.viewTopBarModo()}
         
            <FlatList 
                ref={ref => (this.scrollView = ref)}
                data={ messages}  
                keyExtractor={item => item && item["@id"]}
                renderItem={({ item }) => <Item item={item} idUser={idUser} />}
                // contentInsetAdjustmentBehavior="never"
                // keyboardShouldPersistTaps={Platform.OS==="android"?"handled":"always" }
                keyboardDismissMode='on-drag'
              
                style={{ height: Platform.OS==="ios"?screen.height-180 :screen.height-165,zIndex:-1}} 
                showsVerticalScrollIndicator = {false}
                onScrollEndDrag={()=>this.showTopBarModo()}
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            />
   
         

                <View style={[AppStyles.style.flex, {paddingTop: 10,  alignItems: "center",backgroundColor:"white"}]}>
                   
                    <Input 
                        containerStyle={{ width: "100%"}}
                        value={message}
                        inputContainerStyle={StylesChat.input}
                        inputStyle={{ padding: 0 , }}
                        multiline={true}
                        placeholderTextColor="#9E9E9E"
                        placeholder='Tapez votre message'
                        onChangeText={(e)=> this.inputMesssage(e)}
                        rightIcon={message&&{ 
                            type: 'font-awesome',
                            name: 'send',
                            size: 18, 
                            onPress:()=> this.sendMessage() ,
                            underlayColor:"none" }}
                    />
                  
                </View>
    
          
        
            </KeyboardAwareScrollView>
        </Layout>
        )
    }
}
