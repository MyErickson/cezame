import React, { Component } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import Layout from '../../Components/Layout';
import style from './style';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppStyles from '../../Themes/AppStyles';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.item.expanded, 
            arrow: "chevron-circle-down"
        };
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
        const item = this.props.item;
        return (
            <View style={style.dateContainer}>
                <TouchableWithoutFeedback onPress={() => { this.toggle()}}>

                    
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
                            <Text style={{ fontSize: 12, color: '#A0A0A0', marginLeft: 3 }}>{item.hours}</Text>
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
                </TouchableWithoutFeedback>
                {this.state.expanded == true && (
                <View style={style.dateContent}>
                    <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize: 16 }}>Salle pleniére Medinaceli - RdC</Text>
                    <Text>Intervention de Jean-Philippe Adam, et de Jesus Castilp, Natixis ES-Ital</Text>
                </View>
                )}
            </View>
        );
    }
  }




export default class AgendaScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          date: [
              {key: 0, date: "20/12/2019", hours: "15h00", title: "Remise des cléf de la chambre", place: "Salle plénière Medineceli - RdC", description: "Intervention de Jean-Philippe Adam, et de Jesus Castilp, Natixis ES-Ital"},
              {key: 1, date: "20/12/2019", hours: "15h00", title: "Remise des cléf de la chambre", place: "Salle plénière Medineceli - RdC", description: "Intervention de Jean-Philippe Adam, et de Jesus Castilp, Natixis ES-Ital"}
            ],
        }
    }

    render() {
        return (
            <Layout noPaddingTop allScreenHeader return title="Agenda" navigation={this.props.navigation}>
                <View>
                    <Calendar
                    theme={{  
                        foregroundColor : "transparent", 
                        backgroundColor: "transparent",
                        calendarBackground: "transparent",
                        dayTextColor: "white",
                        monthTextColor: "white",
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 12,
                        'stylesheet.calendar.main': {
                            week: {
                                marginTop: 2,
                                marginBottom: 2,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            },
                        },
                        'stylesheet.day.period': {
                            base: {
                                width: 30,
                                height: 25,
                                alignItems: 'center',
                                borderRadius: 25
                            },
                            fillers: {
                                position: 'absolute',
                                flexDirection: 'row',
                                left: 0,
                                right: 0,
                                height: 25,
                            },
                            leftFiller: {
                                height: 25,
                                flex: 1
                            }, 
                            rightFiller: {
                                height: 25,
                                flex: 1
                            },
                            text: {
                                marginTop: 5,
                                fontSize: 12,
                                color: 'white',
                            },
                        },
                        'stylesheet.calendar.header': {
                            arrowImage: {
                                ...Platform.select({
                                  ios: {
                                    tintColor: 'white'
                                  },
                                  android: {
                                    tintColor: 'white'
                                  }
                                })
                            },
                        }
                    }}
                    style={{ 
                        backgroundColor: "transparent",
                        height: 280,
                     }}
                    current={Date()}
                    onDayPress={(day) => {console.log('selected day', day)}}
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    monthFormat={'MMMM yyyy'}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    firstDay={1}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    markedDates={{
                        '2019-12-17': {selected: true, startingDay: true, color: 'white', textColor: '#1991EB'},
                        '2019-12-18': {selected: true,  color: 'white', textColor: '#1991EB'},
                        '2019-12-19': {selected: true,  color: 'white', textColor: '#1991EB'},
                        '2019-12-20': {selected: true,  color: 'white', textColor: '#1991EB'},
                        '2019-12-21': {selected: true,  color: 'white', textColor: '#1991EB', endingDay: true,},
                    }}
                    markingType={'period'}
                    />
                    <FlatList data={this.state.date} keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                        return(
                                <Item item={item} />
                        )}} 
                    />
                </View>
            </Layout>
        )
    }
}
