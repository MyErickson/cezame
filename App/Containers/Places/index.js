import React, { Component, useRef } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import Layout from '../../Components/Layout';
import Colors from '../../Themes/Colors';
import { Icon } from 'react-native-elements';
import Font from '../../Themes/Font';
import MapView, { Marker, Callout } from 'react-native-maps';
import AppStyles from '../../Themes/AppStyles';
import Images from '../../Themes/Images';
import ModalPlace from './ModalPlace';
import { FlatList } from 'react-native-gesture-handler';
const screen = Dimensions.get("window");


export default class Places extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Coordonnée de la ville
           
            index: -1, // id des lieux récupéré (-1 => aucun récupéré)
            rightModal : new Animated.Value(-screen.width), // position initial des modals des lieux
            leftModal: new Animated.Value(screen.width-(screen.width-(85/2))), // position initial de la modal initiale
        }
    }


    // Lorqu'un lieux est sélectionné, on change l'index par l'id du lieux, on bouge les modals
    _modalPlace = (index) => {
        console.log("Places -> _modalPlace -> index)", index)
        this.setState({ index })
        Animated.timing(this.state.rightModal, {
            toValue: screen.width-(screen.width-(85/2)), 
            duration: 400
        }).start();
        Animated.timing(this.state.leftModal, {
            toValue: -screen.width, 
            duration: 400
        }).start();
    }


    // Lorsqu'un le bouton retour est sélectionné, on remet les valeurs initiales
    _return = () => {
        const { pointsOfInterest } = this.props.trip_User

        Animated.timing(this.state.rightModal, {
            toValue: -screen.width, 
            duration: 400
        }).start();

        
        Animated.timing(this.state.leftModal, {
            toValue: screen.width-(screen.width-(85/2)),
            duration: 400
        }).start(() => this.setState({ index: -1 }));
        pointsOfInterest[0] && this.map.animateToRegion({
            latitude: parseFloat(pointsOfInterest[0].latitude),
            longitude:  parseFloat(pointsOfInterest[0].longitude),
            latitudeDelta: 0.082,
            longitudeDelta: 0.0521,
        }, 1000)

}

    render() {
        const { adress , initialRegion ,leftModal } = this.state
        const { trip_User ,navigation } = this.props
      
        return (
            <Layout noPaddingTop title="Points d'intérêts" navigation={navigation}>
                <MapView
                    style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
                    initialRegion={  trip_User.pointsOfInterest[0] &&{
                        latitude:  parseFloat(trip_User.pointsOfInterest[0].latitude) ,
                        longitude: parseFloat(trip_User.pointsOfInterest[0].longitude),
                        latitudeDelta: 0.0052,
                        longitudeDelta: 0.0121,
                    }}
                    ref={ref => { this.map = ref; }}
                    onMapReady={ (e) => {this._return()} }
                >

                    {/* Boucle pour les marqueurs */}
                    {trip_User.pointsOfInterest[0] && trip_User.pointsOfInterest.map( (marker, index) => {
                    console.log("Places -> render -> marker", marker)
                 
                        return(
                            <Marker
                                coordinate={{latitude: parseFloat(marker.latitude) ,longitude: parseFloat(marker.longitude)}}
                                title={marker.title}
                                onPress = {() => {
                                    this.map.animateToRegion({
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude),
                                    latitudeDelta: 0.0002,
                                    longitudeDelta: 0.001,
                                }, 1000), this._modalPlace(index) }}
                            >
                                <Image source={Images.marker} style={{ width: 25, height: 34 }} />
                            </Marker>
                        )
                    })}
                </MapView>

                {/* Boucle pour les modals lieux */}
                {trip_User.pointsOfInterest[0] && trip_User.pointsOfInterest.map( (item, index) => {
  
                    return(
                        <Animated.View 
                        key={index}
                        style={{ position: "absolute",bottom: 75, right: this.state.index == index ? this.state.rightModal : -screen.width }}
                        >
                            <ModalPlace 
                            title={item.title} 
                            description={item.description ? item.description :"" } 
                            onBack={this._return} />
                        </Animated.View>
                    )})
                }


                <Animated.View 
                    style={{ 
                        backgroundColor: '#F6F6F6', borderRadius: 15, 
                        width: screen.width-85, alignSelf: "center", 
                        bottom: 35, position: "absolute",
                        left: leftModal 
                    }}
                >
                    <Text style={[Font.style.h3, { paddingLeft: 50, paddingVertical: 15 }]}>Adresses utiles</Text>
                    <View style={{ paddingLeft: 50, backgroundColor: "white", paddingTop: 15, paddingBottom: 25,borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
                        
                        {/* Boucle pour la liste des lieux */}
                        {trip_User.pointsOfInterest[0] ? (
                            <FlatList data={ trip_User.pointsOfInterest} 
                        keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                            return(
                                <View>
                                    <TouchableOpacity 
                                        onPress = {() => {
                                            this.map.animateToRegion({
                                            latitude: parseFloat(item.latitude),
                                            longitude: parseFloat(item.longitude),
                                            latitudeDelta: 0.0052,
                                            longitudeDelta: 0.0121,
                                        }, 1000), this._modalPlace(index)
                                    }}
                                    >
                                        <View style={[AppStyles.style.flex, {alignItems: 'center'}]}>
                                            <Icon name="arrow-right" type="simple-line-icon" size={8} />
                                            <Text style={{ marginVertical: 2, marginLeft: 5 }}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}} 
                        /> 
                        ) : <Text>Les adresses seront bientôt ajoutés.</Text>}
                        
                    </View>
                </Animated.View>
            </Layout>
        )
    }
}
