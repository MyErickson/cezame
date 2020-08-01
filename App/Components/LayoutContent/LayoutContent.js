import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text, Dimensions, StatusBar ,TouchableOpacity ,Image } from 'react-native';
import { Icon } from 'react-native-elements';
import ContainerSocialNetwork  from '../SocialNetworkButtons/containerSocial';
import Colors from '../../Themes/Colors';
const screen = Dimensions.get("window");
import { Styles } from './styleLayoutContent'
import NavigationService from '../../Services/NavigationService';

export default class LayoutContent extends Component {
    

    render() {
        const { title ,navigation , infoUser } = this.props
        return (
            <View>
                <StatusBar translucent backgroundColor={Colors.rightColor} />
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0062EC','#07318D']} 
                    style={{ height: 150, paddingTop: 35 }}
                >
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:20}}>
                        <Icon 
                            underlayColor="none"
                            name="ios-arrow-round-back" 
                            type='ionicon' 
                            onPress={ () => navigation.goBack() }
                            color={'white'}
                            containerStyle={{top:10}}
                            size={40}
                        />
                        
                        <Text style={Styles.title}>{title} </Text>
                        <TouchableOpacity 
                                style={{top:10}} 
                                onPress={() => NavigationService.navigate("Parameters")} 
                            >
                                <Image source={infoUser && infoUser.avatar? {uri:infoUser.avatar.contentUrl}: ""} style={{ width: 35, height: 35, borderRadius: 35 }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={Styles.containerChildrend} contentContainerStyle={{ paddingBottom: 50 }}>
                    {this.props.children}
                </View>
                <View style={{ width: "100%", backgroundColor: Colors.lightSecondary }}>
                    <ContainerSocialNetwork  white />
                </View>
            </View>
        )
    }
}