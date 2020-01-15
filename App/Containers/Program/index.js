import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import { Button, Icon } from 'react-native-elements';
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import Font from '../../Themes/Font';
import AppStyles from '../../Themes/AppStyles';
import NavigationService from '../../Services/NavigationService';
const screen = Dimensions.get('window');
import MapView, { Marker, Callout } from 'react-native-maps';

export default class Program extends Component {

    constructor(props){
        super(props);
        this.state = {
            trip_User:undefined
        }
    }

    componentDidMount(){
        const {tokenConnection } = this.props
        
        
    }

    static getDerivedStateFromProps(props,state){
        state.trip_User = props.trip_User 
    }
    render() {
   
            const { trip_User } =this.state
            console.log("TCL: Program -> render -> this.state.trip_User", this.state.trip_User)
            let  startDate,endDate,endMonth,startMonth = undefined
         if(trip_User){
            startDate = new Date(trip_User.startAt)
            startMonth =  startDate.getMonth()+1 < 10 ? "0"+(startDate.getMonth()+1) : startDate.getMonth()+1
            endDate =  new Date(trip_User.endAt)
            endMonth = endDate.getMonth()+1 <10 ? "0" + (endDate.getMonth()+1) : endDate.getMonth()+1
         }
       
        

    
        return (
            <ContainerLayout title="Mon Programme" navigation={this.props.navigation}>
                <ScrollView>
                    <View style={[AppStyles.style.pH35Flex, { paddingBottom: 10, alignItems: "center", justifyContent: "space-between" }]}>
                        <View>
                            <Text style={Font.style.h1}>{trip_User && trip_User.location}</Text>
                            <Text style={Font.style.normal}>{trip_User&& trip_User.title}</Text>
                        </View>
                        <Image source={Images.devGroup} />
                    </View>
                    <Image  source={Images.devImageProgram} style={{ width: "100%", maxHeight: 200 }} />
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
                            buttonStyle={[AppStyles.style.pH7, { backgroundColor: Colors.lightPrimary, borderRadius: 5, minWidth: 190 }]} 
                            title="Votre convocation" 
                            icon={
                                <Icon
                                name="file-document"
                                type="material-community"
                                size={18}
                                color="white"
                                />
                            }
                            titleStyle={{ marginLeft: 5, }}
                        />
                        <Button 
                            buttonStyle={[AppStyles.style.pH7, { backgroundColor: Colors.primary, borderRadius: 5, minWidth: 190 }]} 
                            title="Carnet de voyage" 
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
                    <View style={[AppStyles.style.pV15, {paddingLeft: 20}]}>
                        <Text  style={Font.style.h2}>Votre hôtel</Text>
                    </View>
                    <View  style={[AppStyles.style.flex, {justifyContent: "space-evenly"}]}>
                        <MapView style={{ backgroundColor: "grey", width: (screen.width/3)+15, height: (screen.width/3)+15, borderRadius: 5 }}/>
                        <View style={{ width: (screen.width/2)+15 }}>
                            <TouchableOpacity onPress={()=>{ NavigationService.navigate('Places', { coord: {latitude: 40.415584, longitude: -3.707412, latitudeDelta: 0.0052, longitudeDelta: 0.0121, } }) }}>
                                <Text style={[Font.style.h3, { flexShrink: 1}]}>Plaza de Las Cortes*****</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 10, marginBottom: 5, flexDirection: "row" }}>
                                <Icon
                                    name='map-marker'
                                    type='material-community'
                                    color={Colors.primary}
                                    size={14}
                                    containerStyle={{ marginRight: 5 }}
                                />
                                <Text style={[Font.style.normal, { flexShrink: 1, color: Colors.primary }]}>Plaza de las Cortes, 7 28014, Madrid, Espagne</Text>
                            </View>
                            <View style={{ marginTop: 5, marginBottom: 15, flexDirection: "row" }}>
                                <Icon
                                    name='phone'
                                    type='material-community'
                                    color={Colors.primary}
                                    size={14}
                                    containerStyle={{ marginRight: 5 }}
                                />
                                <Text style={[Font.style.normal, { flexShrink: 1, color: Colors.primary }]}>+34 913 60 80 00</Text>
                            </View>
                            <Button 
                                buttonStyle={{ backgroundColor: Colors.lightSecondary, borderRadius: 5 }} 
                                onPress={()=>{ NavigationService.navigate('Places', { coord: {latitude: 40.415584, longitude: -3.707412, latitudeDelta: 0.0052, longitudeDelta: 0.0121, } }) }}
                                title="Voir plus de détail sur l'hôtel" 
                                titleStyle={{ marginLeft: 5, fontSize: 13, fontWeight: "normal" }}
                            />
                        </View>
                    </View>
                    <View style={[AppStyles.style.pV15, {paddingLeft: 23}]}>
                        <Text style={Font.style.h2}>Informations</Text>
                         <Text>{trip_User && trip_User.hotelDescription}</Text>
                    </View>
                </ScrollView>
            </ContainerLayout>
        )
    }
}
