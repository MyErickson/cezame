import React, { Component } from 'react'
import { Text, View ,ScrollView, Image} from 'react-native'
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import Carousel from 'react-native-snap-carousel';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
 class Hotel extends Component {

    _renderItem = ({item, index}) => {
        return (
            <View style={{flex:1,}} key={ index}>
                 <Image source={{uri:item}} style={{ width: "100%",marginVertical:30, height: wp("55%"),borderRadius:10}} />
            </View>
        );
    }

    render() {

        const { trip_User } = this.props
   

        let image = undefined
  
 
        
         if(trip_User?.hotel?.photos ){
             const photos = trip_User.hotel.photos 
             image =  photos.map(value =>{
                 return value.contentUrl
             })
         }


        return (
            <ContainerLayout title="Hôtel" navigation={this.props.navigation}>
                <ScrollView 
                 showsVerticalScrollIndicator = {false}
                 contentInsetAdjustmentBehavior="never"
                >
                    <View style={{paddingBottom:40}}>
                        <Carousel layout={'stack'}
                        data={image}
                        // contentContainerCustomStyle={{backgroundColor:'black',,width:}}
                        renderItem={this._renderItem }
                        sliderWidth={380}
                        itemWidth={320}
                        loop={true}
                        autoplayDelay={1000}
                        autoplay={true}
                        />
                        <Text style={{fontSize:18, fontWeight:'bold', marginLeft:20 , marginBottom:20}} >
                        {trip_User && trip_User.hotel ? trip_User.hotel.title: 'Titre'}
                        </Text>
                        <Text style={{marginHorizontal:20,fontSize:14 , textAlign:'justify'}}>
                        {trip_User && trip_User.hotel ? trip_User.hotel.description : 'Bientôt...'}
                        </Text>
                </View>
                </ScrollView>
            </ContainerLayout>
        )
    }
}

export default Hotel
