import React, { Component } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Text, View, FlatList, TouchableWithoutFeedback ,Platform,SafeAreaView} from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import style from './style';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';




LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

 class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.item.expanded, 
            arrow: "chevron-circle-down"
        };
    

    toggle() {
        if( this.state.expanded == true) {
            this.setState({ arrow: "chevron-circle-down" })
        }
        else {
            this.setState({ arrow: "chevron-circle-up" })
        }
        this.setState({ expanded: !this.state.expanded });
    }
    
    render() {
        const {item }= this.props;
       
        return (
            <View style={style.dateContainer}>
                {/* <TouchableWithoutFeedback onPress={() => { this.toggle()}}>

                    
                    <View style={[style.dateTitle, 
                        {
                            borderBottomLeftRadius:  this.state.expanded == true ? 0 : 15,
                            borderBottomRightRadius:  this.state.expanded == true ? 0 : 15, 
                        }]
                    }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon 
                            name="access-time"
                            size={13}
                            color="#F9C660"
                            />
                            <Text style={{ fontSize: 12, color: '#A0A0A0', marginLeft: 3 }}>{"hours"}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>Remise des cléf de la chambre</Text>
                                <Text>Salle plénière Medineceli - RdC</Text>
                            </View>
                            <View>
                                <Icon
                                    name={this.state.arrow}
                                    type="font-awesome"
                                    color={Colors.primary}
                                    size={18}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback> */}
                {/* {this.state.expanded == true && (
                <View style={style.dateContent}>
                    <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize: 16 }}>Salle pleniére Medinaceli - RdC</Text>
                    <Text>Intervention de Jean-Philippe Adam, et de Jesus Castilp, Natixis ES-Ital</Text>
                </View>
                )} */}
            </View>
        );
    }
  }

export default Item