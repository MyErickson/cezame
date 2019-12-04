import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Layout from '../../Components/Layout';
import { Button, Icon } from 'react-native-elements';
import Images from '../../Themes/Images';
import Colors from '../../Themes/Colors';
import Font from '../../Themes/Font';
import AppStyles from '../../Themes/AppStyles';

export default class Program extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Layout title="Mon Programme" navigation={this.props.navigation}>
                <ScrollView>
                    <View style={[AppStyles.style.pH35Flex, { paddingBottom: 10, alignItems: "center", justifyContent: "space-between" }]}>
                        <View>
                            <Text style={Font.style.h1}>Madrid</Text>
                            <Text style={Font.style.normal}>Séminaire Développement</Text>
                        </View>
                        <Image source={Images.devGroup} />
                    </View>
                    <Image  source={Images.devImageProgram} style={{ width: "100%", maxHeight: 200 }} />
                    <View style={[AppStyles.style.pV15, {flexDirection: "row", justifyContent: "space-evenly"}]}>
                        <View>
                            <Text style={[Font.style.h3, {textAlign: "center"}]}>Du</Text>
                            <Text style={Font.style.normal}>15 juillet 2019</Text>
                        </View>
                        <View>
                            <Text style={[Font.style.h3, {textAlign: "center"}]}>Au</Text>
                            <Text style={Font.style.normal}>25 juillet 2019</Text>
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
                    <View style={[AppStyles.style.pV15, {paddingLeft: 23}]}>
                        <Text  style={Font.style.h2}>Votre hôtel</Text>
                    </View>
                    <View  style={[AppStyles.style.pH15Flex, {justifyContent: "space-evenly"}]}>
                        <View style={{ backgroundColor: "grey", width: '50%', maxWidth: 165, height: 165, borderRadius: 5 }}>
                            <Text>Map</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={[Font.style.h3, { flexShrink: 1}]}>Plaza de Las Cortes*****</Text>
                            <View style={{ marginTop: 15, marginBottom: 7, flexDirection: "row" }}>
                                <Icon
                                    name='map-marker'
                                    type='material-community'
                                    color={Colors.primary}
                                    size={14}
                                    containerStyle={{ marginRight: 5 }}
                                />
                                <Text style={[Font.style.normal, { flexShrink: 1, color: Colors.primary }]}>Plaza de las Cortes, 7 28014, Madrid, Espagne</Text>
                            </View>
                            <View style={{ marginTop: 7, marginBottom: 15, flexDirection: "row" }}>
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
                                title="Voir plus de détail sur l'hôtel" 
                                titleStyle={{ marginLeft: 5, fontSize: 13, fontWeight: "normal" }}
                            />
                        </View>
                    </View>
                    <View style={[AppStyles.style.pV15, {paddingLeft: 23}]}>
                        <Text style={Font.style.h2}>Informations</Text>
                        <Text>Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do eiusmod tempor incididunt</Text>
                    </View>
                </ScrollView>
            </Layout>
        )
    }
}
