import React, {Component} from 'react'
import { View, Text ,Platform,StatusBar ,SafeAreaView ,Dimensions,Animated,Image} from 'react-native'
import Colors from '../../../Themes/Colors';
import { Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from '../styleGallery'
import AppStyles from '../../../Themes/AppStyles';
const screen = Dimensions.get("window");

class  CurrentImage extends Component{
  state={
    isDone: new Animated.Value(0),
  }

    render ( ){

        const { navigation} = this.props
        console.log("TCL: CurrentImage -> render -> this.props", this.props)
        return (
            
        <View style={{flex:1}}>
            <View >
                
                <StatusBar translucent backgroundColor={Colors.rightColor} style={{zIndex:1}} />
         
                <Header
                    containerStyle={Platform.OS==="android"&&{height:50, marginTop:10}}
                    leftComponent={{ icon: 'close', color: '#fff', onPress: () => {navigation.goBack()} ,underlayColor:"none"}}
                    leftContainerStyle={{height:40}}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [Colors.leftColor, Colors.rightColor],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 },
                    }}
                />
               
        </View>
   
                    <Image source={{uri: navigation.state.params.image}}
                     style={{flex:1}}
                    />

       <SafeAreaView style={[{backgroundColor:Colors.lightSecondary},Platform.OS === "android" && {height:20}]}>
                <View style={{height:45}}>
                    <View style={[{width: screen.width, height:0},Platform.OS==="android"? {top:-45} : {top:-28} ]}>
                        <View style={Styles.footerIconDownload}>
                            <Icon
                                underlayColor="none"
                                name="download"
                                color="white"
                                type="font-awesome"
                                onPress={() => {console.log(navigation.state.params.image)} }
                            />
                        </View>
                    
                        <Animated.View style={[Styles.animetedFooter,{opacity: this.state.isDone, }]}>
                            <Text style={{ textAlign: "center" }}>Téléchargement terminé.</Text>
                        </Animated.View>
                    </View>
                    <View style={Styles.footerContainer}>
                        <View style={AppStyles.style.flex}>
                            <Icon 
                                underlayColor="none"
                                name="home"
                                color="white"
                                type="font-awesome"
                                containerStyle={{ marginRight: 20 }}
                                onPress={() => { navigation.navigate("Program") }}
                            />
                            <Icon 
                                underlayColor="none"
                                name="comments"
                                color="white"
                                type="font-awesome"
                                onPress={() => { navigation.navigate("Chat") }}
                            />  
                        </View>
                        <Icon
                            underlayColor="none"
                            name="menu"
                            color="white"
                            onPress={ () => {  navigation.toggleDrawer()  } }
                        />
                    </View>
                </View>
                </SafeAreaView>
            </View>

        )
    }
    }
    

export default CurrentImage
