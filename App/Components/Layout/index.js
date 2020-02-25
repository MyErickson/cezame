import React, { PureComponent , Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View,
    Text,
    Dimensions, 
    BackHandler, Image, StatusBar, TouchableOpacity ,SafeAreaView } from 'react-native';
import { Icon,Header } from 'react-native-elements';
import Colors from '../../Themes/Colors';
import NavigationService from '../../Services/NavigationService';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
 import ContainerUplaoadImage from '../../Containers/Gallery/UploadImage/ContainerUplaoadImage';
import { Styles } from './styleLayout'
const screen = Dimensions.get("window");



export default class Layout extends PureComponent {


      state={
        tokenConnection:undefined,
        infoUser:undefined
      }


    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack()
            return true;
        });
    }

  static getDerivedStateFromProps(props,state){
      
            if(props.infoUser){
                state.infoUser = props.infoUser
            }else{
                return null
            }
  }

 gotBackScreen =()=>{
     const { title ,navigation} =  this.props
     if(title === 'Mon Programme'){
        navigation.navigate("Home")
     }else {
        navigation.goBack()
     }
 }
    render() {
        const { tokenConnection,title} = this.props
        const { infoUser } =this.state
    

 

      
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor={Colors.rightColor} />
              
                <Header
                    containerStyle={{marginBottom:-0.2}}
                    leftComponent={
                        <TouchableOpacity 
                        onPress={ () =>this.gotBackScreen() }
                         >
                           <Icon 
                               underlayColor="none"
                               name='arrow-back'
                               color="white"
                               containerStyle={{ marginRight: 15 }}
                               
                           />
                       </TouchableOpacity>}
                    centerComponent={{ text: title, style: { color: '#fff',fontSize:18,fontWeight: 'bold' } }}
                    rightComponent={
                        tokenConnection ?   this.props.chat == true ?
                    <View style={[AppStyles.style.flex, {  alignItems: "center"}]}>
                          <TouchableOpacity 
                         onPress={() => NavigationService.navigate("Program")}
                          >
                            <Icon 
                                underlayColor="none"
                                name="home"
                                color="white"
                                containerStyle={{ marginRight: 15 }}
                                
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                         onPress={ () => { this.props.navigation.toggleDrawer() } }
                         >
                            <Icon
                                underlayColor="none"
                                name="menu"
                                color="white"
                                containerStyle={{ marginRight: 5 }}
                                
                        /> 
                        </TouchableOpacity>
                    </View> 
                        : 
                    <View style={[AppStyles.style.flex, { alignItems: "center"}]}>
                    <TouchableOpacity 
                         onPress={() =>  NavigationService.navigate('Notifications')}
                         >
                        <Icon 
                            underlayColor="none"
                            name="notifications" 
                            color='white'
                         
                        />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={Styles.iconParam} 
                            onPress={() => NavigationService.navigate("Parameters")} 
                        >
                            <Image source={infoUser && infoUser.avatar? {uri:infoUser.avatar.contentUrl}: Images.devProfil} style={{ width: 35, height: 35, borderRadius: 35 }} />
                        </TouchableOpacity>
                    </View>
                    :null
                 }
              
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [Colors.leftColor, Colors.rightColor],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 },
                    }}
                />

  
                <View style={{flex:1}} >
                    {this.props.children}
                </View>


                {tokenConnection && 
                <SafeAreaView style={{backgroundColor:Colors.lightSecondary,marginTop:-10}}>
                    {!this.props.chat && (
                        <View style={[Styles.containerMenu]}>
                            {this.props.gallery && (
                                <ContainerUplaoadImage  />
                            )}
                            <View style={AppStyles.style.flex}>
                            <TouchableOpacity 
                              onPress={() => NavigationService.navigate("Program")}
                            >
                                <Icon 
                                   
                                    name="home"
                                    color="white"
                                    type="font-awesome"
                                    containerStyle={{ marginRight: 20 }}
                                  
                                />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => NavigationService.navigate("Chat")}
                                >
                                    <Icon 
                                       
                                        name="comments"
                                        color="white"
                                        type="font-awesome"
                                   
                                    />  
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                             onPress={ () => { this.props.navigation.toggleDrawer() } }
                            >
                                <Icon
                               
                                    name="menu"
                                    color="white"  
                                   
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </SafeAreaView> }
      

            </View>
        )
    }
}