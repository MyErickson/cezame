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

const optionsImagePicker = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


var chat

export default class Chat extends Component {
  constructor(props){
    super(props);
      this.state={
        avatarSource: undefined,
        messages:[],
        idUser:undefined, 
        message:null
      }
      this.viewAnimated = new Animated.Value(0);
      this.startAnimated=false
  }


    componentDidMount(){
        this.getMessage()
       chat= setInterval(()=>{
            this.getMessage()
        },3000)
        

    } 
  
    componentWillUnmount(){
        console.log("Chat -> componentWillMount -> componentWillMount")
        clearInterval(chat);
    }

    getMessage=()=>{
        const { infoToken,tokenConnection} =this.props
 
        let id = infoToken && infoToken.trip_id
        axios.get(`https://cezame-dev.digitalcube.fr/api/trips/${id}/messages`,{
            headers:{
                'Authorization':"Bearer "+tokenConnection
        }}).then(res=>{
        console.log("Chat -> getMessage -> es", res.data["hydra:member"])
            this.setState({
                messages:res.data["hydra:member"],
                idUser:infoToken.id
            })
        }).catch(err=>{
            
        })
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
        const { message } =this.state
        const { tokenConnection } = this.props

        axios.defaults.headers['Authorization']= "Bearer "+tokenConnection;
        axios.post(`https://cezame-dev.digitalcube.fr/api/messages`,{
            content:message
        })
        .then(res=>{
        console.log("Chat -> getMessage -> es", res)
        this.setState({
            message:undefined
        })
        this.getMessage()
         
        }).catch(err=>{
        console.log("Chat -> sendMessage -> err", err)
            
        })
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
