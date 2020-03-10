import React, { Component, Fragment } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Text,
    View,
    FlatList, 
    TouchableWithoutFeedback ,
    Platform,SafeAreaView , 
    ScrollView , 
    RefreshControl ,
    Dimensions} from 'react-native';
import ContainerLayout from '../../Components/Layout/ContainerLayout';
import style from './style';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppStyles from '../../Themes/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
const screen = Dimensions.get("window");
var jwtDecode = require('jwt-decode');


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
        const { item } = this.props;
       
        
        return (
            <View style={style.dateContainer}>
              
                    <TouchableWithoutFeedback onPress={() => { this.toggle()}}>

                                                
                        <View style={[style.dateTitle, 
                            {
                                borderBottomLeftRadius:  this.state.expanded == true ? 0 : 15,
                                borderBottomRightRadius:  this.state.expanded == true ? 0 : 15, 
                            }]
                        }>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{ fontSize: 12, color: '#A0A0A0', marginLeft: 3 ,marginTop:4}}>{item.date}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center",  marginLeft:35 }}>
                                    <Icon 
                                            name="access-time"
                                            size={13}
                                            color="#F9C660"
                                            />
                                            
                                    <Text style={{  fontWeight: "bold", fontSize: 12 }}>{item.hours}</Text>
                                </View>
                                
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 ,color:Colors.primary}}>{item.title}</Text>
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
                    
                                <Text>{item.description ? item.description : "bientôt une description..."}</Text>
                            </View>
                            )}
                
              
            </View>
        );
    }
  }




export default class Agenda extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:undefined,
            refreshing:false
        }
    }

     componentDidMount(){
        
         let data = this.daySteps()
          this.setState({
              data
          })
     }
  
  static    getDerivedStateFromProps(props,state){
                const { day_steps} = props
                console.log("TCL: Agenda -> getDerivedStateFromProps -> day_steps", day_steps)
                let { dateDay } = state
             
                let dataDaySteps =0
                
                if( day_steps && day_steps!== "error"   ){
                   
                     dataDaySteps  = day_steps.map((value,key)=>{
                        return {
                            key:key,
                            date: Moment(value.fullDate).format("DD/MM/YYYY"),
                            dateSort: Moment(value.fullDate).format("YYYY-MM-DD"),
                            hours:Moment(value.fullDate).format("H[h]mm"),
                            title:value.title,
                            description:value.description,
                        }
                      })

                    if(dateDay){

                       state.data = dataDaySteps.filter(value => value.dateSort ===  dateDay)
                     
                      }else{

                        state.data = dataDaySteps 
                        
                      }
                    

                }else{

                    return null
                    
                }

     }


     daySteps = ()=>{
        const { day_steps } = this.props
        console.log("TCL: Agenda -> daySteps -> trip_User", day_steps)

        let data = day_steps && day_steps.map((value,key)=>{
            return {
                key:key,
                date: Moment(value.fullDate).format("DD/MM/YYYY"),
                hours:Moment(value.fullDate).format("H[h]mm"),
                title:value.title,
                description:value.description,
            }
          })
          return data

     }

     onRefresh =()=>{ 
       
        this.setState({
            refreshing:true,
            dateDay:undefined
        });
        this.getTrips()
        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)

    
      
    }

    getTrips=()=>{
        const {tokenConnection ,callDaySteps } = this.props

        var decode = jwtDecode(tokenConnection)
            
        const data = new FormData
        data.token = tokenConnection
        data.id = decode.id
        data.idTrip=decode.trip_id

        callDaySteps (data)
    }

    period =()=>{

        const { startAt , endAt} = this.props.trip_User

        let start = Moment(startAt).format("YYYY-MM-DD")
        let end = Moment(endAt).format("YYYY-MM-DD") 
        let time =  new Date(start)
        let tab = {}
        let i = 1
     
        
        tab[start] = {selected: true, startingDay: true, color: 'white', textColor: '#1991EB'}

        do{
          let day = Moment(time).add(i,'days').format("YYYY-MM-DD")

          tab[day]= {selected: true, color: 'white', textColor: '#1991EB'}
         
          i += 1
          start = day

        }while(start !== end)

        tab[end] = {selected: true, endingDay: true, color: 'white', textColor: '#1991EB'}

        return tab
    }

    showPlaning =(day)=>{
    
    this.setState({
        dateDay:day.dateString
    })

    }

    render() {  


        const { data ,refreshing} = this.state

        
        let period = this.period()
         
        return (
            
            <ContainerLayout noPaddingTop allScreenHeader return title="Agenda" navigation={this.props.navigation}>
       

                <View style={{flex:1}}>
                    <LinearGradient 
                    colors={["#0062EC", "#07318D"]}    
                    start={ {x: 0 ,y: 1}} end ={{x:1, y: 0 }} 
                    style={{flex:1}}
                    >
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
                        onDayPress={(day) => this.showPlaning(day)}
                        monthFormat={'MMMM yyyy'}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={1}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        markedDates={period}
                        markingType={'multi-period'}
                        />
                        <ScrollView
                            style={{ flex:1, marginBottom:10,marginTop:10}} 
                            showsVerticalScrollIndicator = {false}
                       
                            refreshControl={
                                <RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={()=>this.onRefresh()} 
                                colors={["#0000ff"]}
                                tintColor="white"
                                titleColor="white"
                                title="actualise"/>
                            }
                            >
                            <SafeAreaView>
                                { data.length ? (<FlatList 
                                
                                data={data} 
                                
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator = {false}
                                renderItem={({ item, index }) => {
                                return(
                                        <Item item={item} />
                                )}} 
                            
                                />):
                                <Text style={{color:"white",fontSize:18,textAlign:"center"}}>
                                    Aucun planning disponible pour ce jour
                                </Text>
                                }
                                
                            
                            </SafeAreaView>
                        </ScrollView>
                    </LinearGradient>
                </View>
          
            </ContainerLayout>
        )
    }
}
