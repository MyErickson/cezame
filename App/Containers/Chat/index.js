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
        socket:undefined,
        modo:undefined
      }
      this.viewAnimated = new Animated.Value(0);
      this.startAnimated=false
  }


    componentDidMount(){
        const { tokenConnection ,trip_User} =this.props
        console.log("Chat -> componentDidMount -> trip_User",  trip_User.users[0])
       
        console.log("Chat -> componentDidMount -> screen ", screen )
        
       let  socket = io(socketAddress + ':' + socketPort, {
            query: {
                token: tokenConnection,
            }
        });


        
        socket.on('new_posted_message', (message) => {
            const { messages } =this.state
            this.setState({
                messages:[...messages,message],
            })
            
        });
          
            
        this.getMessage(socket)

        this.getNewMessage(socket)


        this.setState({
           modo:trip_User.users[0],
           socket
       })
        

    } 
  
    componentWillUnmount(){
      
        const { socket } =  this.state
        socket.disconnect(true);
    }

    getMessage=(socket)=>{
        const { infoToken,tokenConnection} =this.props
   

        socket.on('auth', (status) => {
            if (!status.isAuth) {
                console.log(status.error);
            } else {
                
                this.setState({
                    messages:status.messages,
                    idUser:infoToken.id
                })
               
            }
        });
      
    }

    getNewMessage =(socket)=>{
        
        socket.on('post_message_status', (status) => {
    
            let isPosted = status.isPosted;
            
            if (!isPosted) {
                console.log(status.error);
            } else {
               const { messages } = this.state 
               this.setState({
                   messages:[...messages,status.message],
                   message:undefined,
                 
               })
               
            }
        }); 

    }

    _uploadImage = () => {
        ImagePicker.launchImageLibrary(optionsImagePicker, (response) => {
         

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
        const { message ,socket } =this.state
        const { tokenConnection } = this.props

    
        socket.emit('post_message', {content: message });

   
    }

    render() {
        screen.height 
        console.log("Chat -> render ->        screen.height ",        screen.height )
        const { messages ,idUser,message ,modo} = this.state
       
        return (
            
        <Layout noPaddingTop chat return title="Messagerie instantanée" navigation={this.props.navigation}>
            
 
            <View style={[AppStyles.style.flex, { alignItems: "center", backgroundColor: Colors.lightPrimary, paddingVertical: 15, paddingHorizontal: 25, justifyContent: "space-between", zIndex: 3, }]}>
                <View style={[AppStyles.style.flex, { alignItems: "center" }]}>
                
                    <View>
                        <Text style={{ color: Colors.white,fontWeight:"bold" }}>Modérateur</Text>
                    </View>
                </View>
                <View>
                    <Icon 
                        name="mail"
                        color={Colors.white}
                        size={25}
                        onPress={() => NavigationService.navigate("Contact")}
                    />
                </View>
            </View>
            <KeyboardAwareScrollView 
             keyboardOpeningTime={50}
             extraScrollHeight={screen.height <750 ? 70 :100}
             keyboardDismissMode='on-drag'
             scrollEnabled={false}
             enableAutomaticScroll={true}
             keyboardShouldPersistTaps="always"
             showsVerticalScrollIndicator = {false}
             style={{marginBottom:10}}
         
             >

             <KeyboardAwareScrollView 
             scrollEnabled={false}
             enableAutomaticScroll={true}
             showsVerticalScrollIndicator = {false}
             

             >

            <FlatList 
                ref={ref => (this.scrollView = ref)}
                data={ messages}  
                keyExtractor={item => item && item["@id"]}
                renderItem={({ item }) => <Item item={item} idUser={idUser} />}
                // contentInsetAdjustmentBehavior="never"
                // keyboardShouldPersistTaps={Platform.OS==="android"?"handled":"always" }
                keyboardDismissMode='on-drag'
              
                style={{ height: Platform.OS==="ios"?screen.height < 750 ? screen.height-200 : screen.height - 250 :screen.height-220,zIndex:-1}} 
                showsVerticalScrollIndicator = {false}
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            />
        
            </KeyboardAwareScrollView>
            
            <View style={[ {flexDirection:"column",paddingTop:Platform.OS==="android"? 20:10,  alignItems: "center",backgroundColor:"white"}]}>
                   
                   <Input 
                       containerStyle={{ width: "100%"}}
                       rightIconContainerStyle={Platform.OS ==="android" && {marginBottom:20}}
                       value={message}
                       inputContainerStyle={Platform.OS === "ios" ? StylesChat.input : StylesChat.inputAndroid}
                       inputStyle={[{ padding: 0  },Platform.OS === "android" && StylesChat.styleAndroid]}
                       multiline={true}
                       placeholderTextColor="#9E9E9E"
                       placeholder='Tapez votre message'
                       onChangeText={(e)=> this.inputMesssage(e)}
                       rightIcon={message&&{ 
                           type: 'font-awesome',
                           name: 'send',
                           size: 18, 
                           onPress:()=> this.sendMessage() ,
                            }}
                   />
              
               </View>
               
               </KeyboardAwareScrollView>
        </Layout>
        )
    }
}
