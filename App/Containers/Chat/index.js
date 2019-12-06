import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView , Dimensions, FlatList } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon, Input } from 'react-native-elements';
import AppStyles from '../../Themes/AppStyles';
import Font from '../../Themes/Font';
import Moment from 'moment';
const screen = Dimensions.get("window");


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
]

function Item({item}) {
    return(
        <View style={[AppStyles.style.flex, { marginHorizontal: 0, alignItems: "flex-end", marginVertical: 15 }]}>
            <View style={{ 
                backgroundColor: "#DCEDD6", 
                borderRadius: 15,
                borderBottomRightRadius: 0, 
                paddingVertical: 10, paddingHorizontal: 25,
                marginLeft: 25, width: '80%'
            }}>
                <Text style={[Font.style.normal, {flexShrink: 1}]}>{item.message}</Text>
                <Text style={{ marginTop: 5, fontSize: 12, color: "#A0A0A0" }}>{Moment(item.date).format("DD/MM -  H[h]mm")}</Text>
            </View>
            <View style={{ backgroundColor: Colors.primary, width: 35, height: 35, borderRadius: 35, marginLeft: 10 }}></View>
        </View>
    )
}

export default class Chat extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            
        <Layout noPaddingTop chat return title="Messagerie instantanée" navigation={this.props.navigation}>

            <View style={[AppStyles.style.flex, { alignItems: "center", backgroundColor: Colors.lightPrimary, paddingVertical: 15, paddingHorizontal: 25, justifyContent: "space-between", zIndex: 3, }]}>
                <View style={[AppStyles.style.flex, { alignItems: "center" }]}>
                    <View style={{ width: 35, height: 35, backgroundColor: Colors.primary, borderRadius: 35, marginRight: 15 }}></View>
                    <View>
                        <Text style={Font.style.h2}>Nom Modérateur</Text>
                        <Text style={{ color: Colors.white }}>Modérateur</Text>
                    </View>
                </View>
                <View>
                    <Icon 
                        name="mail"
                        color={Colors.white}
                        size={25}
                    />
                </View>
            </View>
            <FlatList 
                ref={ref => (this.scrollView = ref)}
                data={data}  
                renderItem={({ item }) => <Item item={item} />}
                keyboardShouldPersistTaps="always" style={{ height: screen.height-360 }} 
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: true, index: -1 }, 200);
                }}
            />
            <KeyboardAvoidingView  behavior={'position'} keyboardVerticalOffset={70} style={{flex: 1}}>  
                <View style={[AppStyles.style.flex, {backgroundColor: Colors.white, paddingTop: 30,  alignItems: "center"}]}>
                    <Input 
                        containerStyle={{ width: "80%" }}
                        inputContainerStyle={{ backgroundColor: Colors.inputBg, borderRadius: 35, paddingVertical: 10, paddingHorizontal: 18, borderBottomWidth: 0, height: 50 }}
                        inputStyle={{ padding: 0 }}
                        placeholder='Tapez votre message'
                        rightIcon={{ type: 'font-awesome', name: 'send', size: 18, color: "#4C4C4C" }}
                    />
                    <View style={AppStyles.style.flex}>
                        <Icon name="smile-o"  type='font-awesome' color="#B6B6B6" size={34} containerStyle={{ marginRight: 8 }} />
                        <Icon name="file-picture-o" type='font-awesome' color="#B6B6B6" size={30} />
                    </View>
                </View>
                    
            </KeyboardAvoidingView>
        </Layout>
        )
    }
}
