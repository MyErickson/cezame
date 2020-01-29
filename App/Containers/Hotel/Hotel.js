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
        const random1 = Math.floor(Math.random() * (100 - 1 +2)) + 1
        const random2 = Math.floor(Math.random() * (100 - 1 +2)) + 1
        const random3 = Math.floor(Math.random() * (100 - 1 +2)) + 1
        const data = [
            `https://i.picsum.photos/id/${random1}/500/800.jpg`,
            `https://i.picsum.photos/id/${random2}/500/800.jpg`,
            `https://i.picsum.photos/id/${random3}/500/800.jpg`,
        ]
        return (
            <ContainerLayout title="Hôtel" navigation={this.props.navigation}>
                <ScrollView style={{marginBottom:40}}
                 showsVerticalScrollIndicator = {false}
                 contentInsetAdjustmentBehavior="never"
                >
                    <Carousel layout={'stack'}
                    data={data}
                    // contentContainerCustomStyle={{backgroundColor:'black',,width:}}
                    renderItem={this._renderItem }
                    sliderWidth={380}
                    itemWidth={320}
                    loop={true}
                    autoplayDelay={1000}
                    autoplay={true}
                     />
                     <Text style={{fontSize:18, fontWeight:'bold', marginLeft:20 , marginBottom:20}} >Lorem ipsum</Text>
                     <Text style={{marginHorizontal:20,fontSize:14}}>Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.

Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum. L'avantage du latin est que l'opérateur sait au premier coup d'œil que la page contenant ces lignes n'est pas valide et que l'attention du lecteur n'est pas dérangée par le contenu, lui permettant de demeurer concentré sur le seul aspect graphique.

Il circule des centaines de versions différentes du lorem ipsum, mais ce texte aurait originellement été tiré de l'ouvrage écrit par Cicéron en 45 av. J.-C., De finibus bonorum et malorum (Liber Primus, 32), texte populaire à cette époque, dont l'une des premières phrases est : « Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit… » (« Il n'existe personne qui aime la souffrance pour elle-même, ni qui la recherche ni qui la veuille pour ce qu'elle est… »).</Text>
                </ScrollView>
            </ContainerLayout>
        )
    }
}

export default Hotel
