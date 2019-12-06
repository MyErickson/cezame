import React, { Component } from 'react'
import {Calendar, CalendarList, Agenda, Arrow} from 'react-native-calendars';
import { Text, View, ScrollView,Button, ActivityIndicator, Image} from 'react-native';
import Layout from '../../Components/Layout';

export default class AgendaScreen extends Component {
    render() {
        return (
            <Layout noPaddingTop title="Points d'intérêts" navigation={this.props.navigation}>
                <View>
                    <Calendar
                    // Initially visible month. Default = Date()
                    current={Date()}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                // maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    //renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}

                    markedDates={{
                        '2019-11-19': {selected: true, startingDay: true, color: 'lime', textColor: 'black'},
                        '2019-11-20': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-21': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-22': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-23': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-24': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-25': {selected: true,  color: 'lime', textColor: 'black'},
                        '2019-11-26': {selected: true, endingDay: true, color: 'lime', textColor: 'black'},
                        
                    }}
                    markingType={'period'}
                    />

                    <ScrollView>
                      
                        <View>
                            <Text>    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, libero. </Text>
                        </View>
                        <View>
                            <Text>    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, libero. </Text>
                        </View>

                    </ScrollView>
                </View>
            </Layout>
        )
    }
}
