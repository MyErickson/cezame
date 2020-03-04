import React, { Component } from 'react';
import { Text, View, 
    KeyboardAvoidingView , 
    Dimensions, 
    FlatList, 
    Platform ,
    Animated,
    TouchableOpacity,SafeAreaView} from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import ImagePicker from 'react-native-image-picker';
import Moment from 'moment';
import NavigationService from '../../Services/NavigationService';
import { Styles } from '../../Components/Layout/styleLayout';
import { StylesChat } from './styleChat'
import axios from "axios"
import Item from "./Item"

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


const data = [
    {
        id: 1, 
        message: 'Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt',
        date: new Date(),
        author: {
            id: 1, 
            lastName: "Nom 1",
            name: "Prénom 1",
            avatar: ""
        }
    },
    {
        id: 2, 
        message: 'Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt',
        date: new Date(),
        author: {
            id: 2, 
            lastName: "Nom 2",
            name: "Prénom 2",
            avatar: ""
        }
    },
    {
        id: 3, 
        message: 'Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt',
        date: new Date(),
        author: {
            id: 1, 
            lastName: "Nom 1",
            name: "Prénom 1",
            avatar: ""
        }
    },
    {
        id: 4, 
        message: 'Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt elit sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet conse ctetur adipiscing ',
        date: new Date(),
        author: {
            id: 2, 
            lastName: "Nom 2",
            name: "Prénom 2",
            avatar: ""
        }
    },
    {
        id: 5, 
        message: 'Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt',
        date: new Date(),
        author: {
            id: 1, 
            lastName: "Nom 1",
            name: "Prénom 1",
            avatar: ""
        }
    },
    {
        id: 6, 
        message: 'Lorem ipsum dolor sit',
        date: new Date(),
        author: {
            id: 1, 
            lastName: "Nom 1",
            name: "Prénom 1",
            avatar: ""
        }
    },
    {
        id: 7, 
        message: 'Lorem ipsum dolor si t elit sed do eiusmod tempor incididunt elit sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet conse ctetur adipiscin ',
        date: new Date(),
        author: {
            id: 2, 
            lastName: "Nom 1",
            name: "Prénom 1",
            avatar: ""
        }
    },
]



export default class Chat extends Component {
  constructor(props){
    super(props);
      this.state={
        avatarSource: undefined,
        messages:undefined,
        idUser:undefined
      }
      this.viewAnimated = new Animated.Value(0);
      this.startAnimated=false
  }


    componentDidMount(){
    console.log("Chat -> componentDidMount -> componentDidMount")
        this.getMessage()
    } 


    getMessage=()=>{
        const { infoToken,tokenConnection} =this.props
        console.log("Chat -> getMessage -> tokenConnection", tokenConnection)
        console.log("Chat -> getMessage -> infoToken", infoToken)
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
   
    componentWillUnmount(){
    console.log("Chat -> componentWillMount -> componentWillMount")

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
                            <View style={{ width: 35, height: 35, backgroundColor: Colors.primary, borderRadius: 35, marginRight: 15 }}></View>
                            <View onPress={() => NavigationService.navigate("Contact")}>
                                <Text style={Font.style.h2}>Nom Modérateur</Text>
                                <Text style={{ color: Colors.white }}>Modérateur</Text>
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

    render() {
     
        const { messages ,idUser} = this.state
        console.log("Chat -> render -> messages", messages)
        return (
            
        <Layout noPaddingTop chat return title="Messagerie instantanée" navigation={this.props.navigation}>
            {this.viewTopBarModo()}
           
            <FlatList 
                ref={ref => (this.scrollView = ref)}
                data={messages}  
                renderItem={({ item }) => <Item item={item} idUser={idUser} />}
                keyboardShouldPersistTaps={Platform.OS==="android"?"handled":"always" }
                keyboardDismissMode='on-drag'
                style={{ height: screen.height-360 ,zIndex:-1}} 
                showsVerticalScrollIndicator = {false}
                onScrollEndDrag={()=>this.showTopBarModo()}
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            />
   
            <KeyboardAvoidingView  behavior={Platform.OS === "android"?'height':'position'} keyboardVerticalOffset={screen.height <= 820 ? hp("9%"): hp("6%")} style={[{height:hp("11%"),}]}>  
            <SafeAreaView style={[{backgroundColor:"white"}]}>
                <View style={[AppStyles.style.flex, {paddingTop: 10,  alignItems: "center",backgroundColor:"white"}]}>
                    <Input 
                        containerStyle={{ width: "80%" }}
                        inputContainerStyle={StylesChat.input}
                        inputStyle={{ padding: 0 }}
                        placeholderTextColor="#9E9E9E"
                        placeholder='Tapez votre message'
                        rightIcon={{ 
                            type: 'font-awesome',
                            name: 'send', 
                            size: 18, 
                            color: "#4C4C4C",
                            onPress:()=>console.log('test') ,
                            underlayColor:"none" }}
                    />
                    <View style={AppStyles.style.flex}>
                        <Icon name="smile-o"  type='font-awesome' color="#B6B6B6" size={34} containerStyle={{ marginRight: 8 }} />
                        <Icon 
                            name="file-picture-o" 
                            type='font-awesome' 
                            color="#B6B6B6" 
                            size={30} 
                            onPress={() => this._uploadImage()}
                        />  
                    </View>
                </View>
                </SafeAreaView> 
            </KeyboardAvoidingView>
   
        </Layout>
        )
    }
}
