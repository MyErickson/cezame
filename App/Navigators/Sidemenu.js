import React, {Component} from 'react';
import {Text, View, Dimensions, Image, ImageBackground, Animated, BackHandler, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Images from '../Themes/Images';
import LinearGradient from 'react-native-linear-gradient';
import SocialNetwork from '../Components/SocialNetworkButtons';
import Colors from '../Themes/Colors';
import Font from '../Themes/Font';
import NavigationService from '../Services/NavigationService';
const screen = Dimensions.get('window');
import { sideMenuApropos  } from "../Configs/General"
class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu: [
              ["Mon programme", "Program"], 
              ["Points d'intérêts", 'Places'], 
              ["Agenda       (bientôt)", 'Agenda'], //Agenda
              ["Galerie photos       (bientôt)", 'Gallery'], //Gallery
              ["Messagerie     (bientôt)", ''], //Chat
              ["Paramètres", 'Parameters'],
              ["Contact", 'Contact']
            ],
          left: new Animated.Value(0),
          iconBack: "clear",
          return: () => {  this.props.navigation.toggleDrawer() },
          titleMenu: ""
        }
    }

    changeMenu = () => {
        this.setState({ iconBack: "arrow-back", return: () => { this.goBack() }, titleMenu: "A propos de Cézame" })
        Animated.timing(this.state.left, {
            toValue: -screen.width, 
            duration: 400
        }).start();
    }

    goBack = () => {
        this.setState({ iconBack: "clear", return: () => { this.props.navigation.toggleDrawer() }, titleMenu: "" })
        Animated.timing(this.state.left, {
            toValue: 0, 
            duration: 400
        }).start();
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.goBack(); // works best when the goBack is async
          return true;
        });
    }

  render () {
    return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fff','#E9ECF5']}>
        <ImageBackground source={Images.bgSidemenu} style={{width: '100%', height: '100%'}} resizeMode={"cover"}>
            <ScrollView style={{ flex:1}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 25, marginBottom: 0, marginTop: Platform.OS==='ios'?55:10 }}>
                    <Icon 
                        name={this.state.iconBack} 
                        color="#000" 
                        size={33} 
                        onPress={this.state.return}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    />
                    <Text style={[Font.style.h2, { color: Colors.darkPrimary, marginTop: 5, fontWeight: "bold" }]}>{this.state.titleMenu}</Text>
                    <TouchableOpacity 
                        style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: Colors.dark}} 
                        onPress={() => { NavigationService.navigate("Parameters"),this.props.navigation.closeDrawer()} } 
                    >
                        <Image source={Images.devProfil} style={{ width: 35, height: 35, borderRadius: 35, }} />
                    </TouchableOpacity>
                </View>
                
                <View style={{ justifyContent: "center" }}>
                    <View style={{ alignSelf: "center", margin: 15 }}>
                        <Image
                            style={{ width: 80, height: 100 }}
                            source={Images.logo}
                        />
                    </View>
                    <Animated.View style={{ flexDirection: "row", left: this.state.left }}>
                        <View style={{ width: screen.width }}>

                            {/* Boucle pour le menu principal */}
                            <FlatList 
                                data={this.state.menu}
                                renderItem={({ item, index }) => 
                                    <Button 
                                        title={item[0]} 
                                        buttonStyle={{ justifyContent: "flex-start", paddingHorizontal: 15, paddingVertical: 12, marginHorizontal: 25, marginVertical: 5, backgroundColor: Colors.white }}
                                        titleStyle={{ marginLeft: 8, color: Colors.darkPrimary }}
                                        onPress={() => { NavigationService.navigate(item[1]), this.props.navigation.closeDrawer() } }
                                        icon={
                                            <Image source={Images["menu"+index]} />
                                        }
                                    />
                                }
                                keyExtractor={item => item.id}
                            />

                            <View style={{  }}>
                                <Button 
                                    title={"A propos de Cézame"} 
                                    buttonStyle={{ justifyContent: "flex-start", paddingHorizontal: 15, paddingVertical: 12, marginHorizontal: 25, marginVertical: 5, backgroundColor: Colors.white }}
                                    titleStyle={{ marginLeft: 8, color: Colors.darkPrimary }}
                                    icon={
                                        <Image source={Images.menu7} />
                                    }
                                    onPress={() => this.changeMenu()}
                                />
                                <View style={{ position: "absolute", top: 18, right: 30, }}>
                                    <Icon name="keyboard-arrow-right" color={Colors.darkPrimary} onPress={() => this.changeMenu()} />
                                </View>
                            </View>
                        </View>



                        <View style={{ width: screen.width ,}}>
                            { sideMenuApropos.map((value,key)=>{

                                return (
                                    <Button 
                                    key={key}
                                    title={value.title} 
                                    buttonStyle={{ justifyContent: "flex-start", paddingHorizontal: 15, paddingVertical: 12, marginHorizontal: 25, marginVertical: 5, backgroundColor: Colors.primary }}
                                    titleStyle={{ marginLeft: 15, color: Colors.white }}
                                    icon={
                                        <Icon 
                                            name={value.iconName} 
                                            type="font-awesome" 
                                            color="white"
                                        />
                                    }
                                    onPress={() => {  this.goBack(), this.props.navigation.toggleDrawer(), NavigationService.navigate(value.navigate) } }
                                />
                                )
                            })}
                                      
           
                        </View>
                    </Animated.View>
                    <SocialNetwork />
                </View>
            </ScrollView>
        </ImageBackground>
      </LinearGradient>
    );
  }
}
export default SideMenu;
