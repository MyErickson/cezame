import React, { Component } from 'react';
import { View, Text,
     Image,
    ScrollView,
    Dimensions,
    RefreshControl , 
    TouchableOpacity , 
    Linking,Platform ,ActivityIndicator} from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import { Button, Icon } from 'react-native-elements';
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import Font from '../../Themes/Font';
import AppStyles from '../../Themes/AppStyles';
import NavigationService from '../../Services/NavigationService';
const screen = Dimensions.get('window');
import MapView, { Marker, Callout } from 'react-native-maps';
import AlertDialog from '../AlertDialog/AlertDialog';
var jwtDecode = require('jwt-decode');

export default class Program extends Component {

    constructor(props){
        super(props);
        this.state = {
            trip_User:undefined,
            alertVisible:undefined,
            messageAlert:undefined,
            style:undefined,
            infoUser :undefined,
            errorServeur:undefined,
            refreshing:false
        }
    }

    componentDidMount(){
        
        this.getTrips()
    }

    static getDerivedStateFromProps(props,state){

        const { trip_User ,infoUser } = props


        if( trip_User && trip_User !== "error" ){

            state.trip_User = trip_User 
            state.infoUser = infoUser
            state.errorServeur = false

        }else if(trip_User === "error"){

            state.errorServeur = true

        }else{

            state.errorServeur = false
            return null
            
        }
    }

    openAlert=(text)=>{
        this.setState({
            alertVisible:true,
            messageAlert:text,
            style:false

        })
    }

    closeAlert=()=>{
        this.setState({alertVisible:false})
        
    }
    
    getTrips=()=>{
        const {tokenConnection ,callTrips} = this.props

        var decode = jwtDecode(tokenConnection)
            
        const data = new FormData
        data.token = tokenConnection
        data.id = decode.id
        data.idTrip=decode.trip_id

        callTrips(data)
    }

   wait=(timeout)=> {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }
      
    onRefresh =()=>{ 
        const { refreshing} = this.state
       
        this.setState({
            refreshing:true
        });
        this.getTrips()
        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)
        // this.wait(6000).then(() =>  this.setState({
        //     refreshing:false
        // }))
    
      
    }


    render() {
   
        const { trip_User,
            
                alertVisible,
                messageAlert,
                infoUser ,
                style,
                errorServeur,
            refreshing} =this.state

                
                console.log("TCL: Program -> render -> trip_User", trip_User)
        let  startDate,endDate,endMonth,startMonth = undefined

        if(trip_User){
            startDate = new Date(trip_User.startAt)
            startMonth =  startDate.getMonth()+1 < 10 ? "0"+(startDate.getMonth()+1) : startDate.getMonth()+1
            endDate =  new Date(trip_User.endAt)
            endMonth = endDate.getMonth()+1 <10 ? "0" + (endDate.getMonth()+1) : endDate.getMonth()+1
        
         }
       
   
       const random1 = Math.floor(Math.random() * (100 - 1 +2)) + 1
       const random2 = Math.floor(Math.random() * (100 - 1 +2)) + 1
    
        return (
            <ContainerLayout title="Mon Programme" navigation={this.props.navigation}>
                { trip_User ? 
                <ScrollView 
                bounces={true}
                showsVerticalScrollIndicator = {false}
                refreshControl={
                    <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={()=>this.onRefresh()} 
                    colors={["#0000ff"]}
                    tintColor="#0000ff"
                    titleColor="#0000ff"
                    title="actualise"/>
                  }
                >
                    <View style={[AppStyles.style.pH35Flex, { paddingVertical: 10, alignItems: "center", justifyContent: "space-between" }]}>
                        <View style={{flex:3}}>
                            <Text style={{fontSize:16,fontWeight:"bold"}}>{trip_User && trip_User.location}</Text>
                            <Text style={{fontSize:14}}>{trip_User&& trip_User.title}</Text>
                        </View>
                        <View style={{flex:3}}>
                            <Image source={
                                trip_User && trip_User.logoSociety ? 
                                {uri:trip_User.logoSociety.contentUrl}:
                                {uri:`https://i.picsum.photos/id/${random1}/200/300.jpg`}
                            } 
                                
                                style={{ width: "100%", height: 45,marginLeft:25 ,borderRadius:3}} />
                        </View>
                    </View>
                    <Image  source={
                        trip_User && trip_User.presentationImage? 
                        {uri:trip_User.presentationImage.contentUrl}:
                        {uri:`https://i.picsum.photos/id/${random2}/500/700.jpg`}
                    } 
                        style={{ width: "100%", height: 200 }} />
                    <View style={[AppStyles.style.pV15, {flexDirection: "row", justifyContent: "space-evenly"}]}>
                        <View>
                            <Text style={[Font.style.h3, {textAlign: "center"}]}>Du</Text>
                            <Text style={Font.style.normal}>{ trip_User && startDate.getDate()+ "/" + startMonth  +"/"+ startDate.getFullYear()}</Text>
                        </View>
                        <View>
                            <Text style={[Font.style.h3, {textAlign: "center"}]}>Au</Text>
                            <Text style={Font.style.normal}>{trip_User&& endDate.getDate()+ "/" +  endMonth +"/" +startDate.getFullYear()}</Text>
                        </View>
                    </View>
                    <View style={[AppStyles.style.flex, {justifyContent: "space-evenly"}]}>
                        <Button 
                            buttonStyle={[AppStyles.style.pH7, { backgroundColor: Colors.lightPrimary, borderRadius: 5, minWidth: '50%' }]} 
                            title="Votre convocation" 
                            onPress={()=>{
                                infoUser  && infoUser.convocation
                                ? Linking.openURL(infoUser.convocation.contentUrl)
                                : this.openAlert("Votre convocation sera bientôt disponible")
                            }}
                            icon={
                                <Icon
                                name="file-document"
                                type="material-community"
                                size={18}
                                color="white"
                                />
                            }
                            titleStyle={{ marginLeft: 5,fontSize: 16, fontWeight: "normal" 
                         }}
                        />
                        <Button 
                            buttonStyle={[AppStyles.style.pH7, { backgroundColor: Colors.primary, borderRadius: 5, minWidth: '50%' }]} 
                            title="Carnet de voyage" 
                            onPress={()=>{
                                trip_User && trip_User.tripGuide
                                ? Linking.openURL(trip_User.tripGuide.contentUrl)
                                : this.openAlert("Le carnet de voyage sera bientôt disponible")
                            }}
                            icon={
                                <Icon
                                name="email"
                                type="material-community"
                                size={18}
                                color="white"
                                />
                            }
                            titleStyle={{ marginLeft: 5, fontSize: 16, fontWeight: "normal" }}
                        />
                    </View>
                    <View style={[AppStyles.style.pV15, {marginTop:5, marginLeft:10}]}>
                        <Text  style={Font.style.h2}>Votre hôtel</Text>
                    </View>
                    <View  style={[AppStyles.style.flex, {justifyContent: "space-evenly",marginTop:5,}]}>
                        <MapView style={{ backgroundColor: "grey", width: (screen.width/3)+15, height: (screen.width/3)+15, borderRadius: 5 ,marginTop:Platform.OS ==="ios"?5:10}}/>
                        <View style={{ width: (screen.width/2)+15 }}>
                            <TouchableOpacity onPress={()=>{ NavigationService.navigate('Places', { coord: {latitude: 40.415584, longitude: -3.707412, latitudeDelta: 0.0052, longitudeDelta: 0.0121, } }) }}>
                        <Text style={[Font.style.h2, { flexShrink: 1,paddingLeft: 15}]}>
                            {trip_User && trip_User.hotel ? trip_User.hotel.title : 'Nom de l\'hôtel'}
                        </Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 20, marginBottom: 5, flexDirection: "row" }}>
                                <Icon
                                    name='map-marker'
                                    type='material-community'
                                    color={Colors.primary}
                                    size={14}
                                    containerStyle={{ marginRight: 5 }}
                                />
                                <Text style={[Font.style.normal, { flexShrink: 1, color: Colors.primary }]}>
                                {trip_User && trip_User.hotel ? trip_User.hotel.address : ''}
                                </Text>
                            </View>
                            <View style={{ marginTop: 5, marginBottom: 15, flexDirection: "row" }}>
                                <Icon
                                    name='phone'
                                    type='material-community'
                                    color={Colors.primary}
                                    size={14}
                                    containerStyle={{ marginRight: 5 }}
                                />
                                <Text style={[Font.style.normal, { flexShrink: 1, color: Colors.primary }]}>
                                    {trip_User && trip_User.hotel ? trip_User.hotel.phone : ''}
                                </Text>
                            </View>
                            <Button 
                                buttonStyle={[{ backgroundColor: Colors.lightSecondary, borderRadius: 5 , },Platform.OS ==="ios" &&{marginTop:0}]} 
                                onPress={()=>{ NavigationService.navigate('Hotel') }}
                                title="Voir plus de détail sur l'hôtel" 
                                titleStyle={{ marginLeft: 5, fontSize: 13, fontWeight: "normal" }}
                            />
                            
                        </View>
                    </View>
                    <View style={[AppStyles.style.pV15, {paddingLeft: 23}]}>
                        <Text style={Font.style.h2}>Informations</Text>
                         <Text style={{marginVertical:10}}>
                             {trip_User && trip_User.hotel ? trip_User.hotel.description.slice(0,100)+"..." : 'Bientôt...'}
                        </Text>
                    </View>
                    
                </ScrollView>
     : <View style={{

        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        top: screen.height * 0.4
      }}>
         <ActivityIndicator  size="large" color="#0000ff"/>
         { errorServeur ? (<Text style={{   textAlign:'center'}}>Nous rencontons un problème de serveur avec le Programme.</Text>)
         
         : (<Text style={{   textAlign:'center'}}>Chargement ...</Text>)}
        
     </View>}
                <AlertDialog
                alertVisible={alertVisible}
                closeAlert={this.closeAlert}
                messageAlert={messageAlert}
                style={style}
                />
            </ContainerLayout>
        )
    }
}
