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
            initialRegion: 
            {
                latitude: 40.424068,
                longitude:  -3.704908,
                latitudeDelta: 0.0822,
                longitudeDelta: 0.0521,
            },
            // Coordonnée des différents lieux
            adress: [
                {
                    id: 1, 
                    title: "Plaza Mayor",
                    coord: [38.2097987, -84.2529869],
                    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.',
                },
                {
                    id: 2, 
                    title: "Musée du Prado",
                    coord: [40.413839, -3.692106],
                    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.',
                },
                {
                    id: 3, 
                    title: "Restaurant Casa de Vélazquez",
                    coord: [40.441431, -3.730483],
                    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.',
                },
            ],
            index: -1, // id des lieux récupéré (-1 => aucun récupéré)
            rightModal : new Animated.Value(-screen.width), // position initial des modals des lieux
            leftModal: new Animated.Value(screen.width-(screen.width-(85/2))), // position initial de la modal initiale
        }
    }


    // Lorqu'un lieux est sélectionné, on change l'index par l'id du lieux, on bouge les modals
    _modalPlace = (index) => {
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
        Animated.timing(this.state.rightModal, {
            toValue: -screen.width, 
            duration: 400
        }).start();
        Animated.timing(this.state.leftModal, {
            toValue: screen.width-(screen.width-(85/2)),
            duration: 400
        }).start(() => this.setState({ index: -1 }));
        this.map.animateToRegion({
            latitude: this.state.initialRegion.latitude,
            longitude:  this.state.initialRegion.longitude,
            latitudeDelta: this.state.initialRegion.latitudeDelta,
            longitudeDelta: this.state.initialRegion.longitudeDelta,
        }, 1000)
    }

    _mapDidUpdate() {
        if (this.props.navigation.state.params != undefined) {
            this.map.animateToRegion({
                latitude: this.props.navigation.state.params.coord.latitude,
                longitude: this.props.navigation.state.params.coord.longitude,
                latitudeDelta: 0.0052,
                longitudeDelta: 0.0121,
            }, 1000) 
            this.setState({ 
                index: 0,
                rightModal : new Animated.Value(screen.width-(screen.width-(85/2))), // position initial des modals des lieux
                leftModal: new Animated.Value(-screen.width), // position initial de la modal initiale 
            });
        }
        else {
        }
    }

    render() {
        return (
            <Layout noPaddingTop title="Points d'intérêts" navigation={this.props.navigation}>
                <MapView
                    style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
                    initialRegion={this.state.initialRegion}
                    ref={ref => { this.map = ref; }}
                    onMapReady={ (e) => {this._mapDidUpdate(e)} }
                >

                    {/* Boucle pour les marqueurs */}
                    {this.state.adress.map( (marker, index) => {
                        const marker_lat = marker.coord[0];
                        const marker_long = marker.coord[1]
                        return(
                            <Marker
                                coordinate={{latitude: marker_lat,longitude: marker_long}}
                                title={marker.title}
                                onPress = {() => {
                                    this.map.animateToRegion({
                                    latitude: marker_lat,
                                    longitude: marker_long,
                                    latitudeDelta: 0.0052,
                                    longitudeDelta: 0.0121,
                                }, 1000), this._modalPlace(index) }}
                            >
                                <Image source={Images.marker} style={{ width: 25, height: 34 }} />
                            </Marker>
                        )
                    })}
                </MapView>

                {/* Boucle pour les modals lieux */}
                {this.state.adress.map( (item, index) => {
                    return(
                        <Animated.View style={{ position: "absolute",bottom: 75, right: this.state.index == index ? this.state.rightModal : -screen.width }}>
                            <ModalPlace title={item.title} description={item.description} onBack={this._return} />
                        </Animated.View>
                    )})
                }


                <Animated.View 
                    style={{ 
                        backgroundColor: '#F6F6F6', borderRadius: 15, 
                        width: screen.width-85, alignSelf: "center", 
                        bottom: 35, position: "absolute",
                        left: this.state.leftModal 
                    }}
                >
                    <Text style={[Font.style.h3, { paddingLeft: 50, paddingVertical: 15 }]}>Adresses utiles</Text>
                    <View style={{ paddingLeft: 50, backgroundColor: "white", paddingTop: 15, paddingBottom: 25,borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
                        
                        {/* Boucle pour la liste des lieux */}
                        <FlatList data={this.state.adress} keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                            return(
                                <View>
                                    <TouchableOpacity 
                                        onPress = {() => {
                                            this.map.animateToRegion({
                                            latitude: item.coord[0],
                                            longitude: item.coord[1],
                                            latitudeDelta: 0.0052,
                                            longitudeDelta: 0.0121,
                                        }, 1000), this._modalPlace(index)
                                    }}>
                                        <View style={[AppStyles.style.flex, {alignItems: 'center'}]}>
                                            <Icon name="arrow-right" type="simple-line-icon" size={8} />
                                            <Text style={{ marginVertical: 2, marginLeft: 5 }}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}} 
                        />
                    </View>
                </Animated.View>
            </Layout>
        )
    }
}
