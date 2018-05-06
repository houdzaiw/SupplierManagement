import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
};

LocaleConfig.defaultLocale = 'fr';
export default class calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    componentDidMount111(){
        let url = 'http://118.190.157.145:8083/yywl-gyswl/mobile/order?userId=9dd836c1-6b33-440b-a310-65089e4024a9&yyid=53010301&ssrqStart=2018-02-03&ssrqEnd=2018-02-10'
        fetch(url, {
            // method: 'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
            },
            //body: JSON.stringify(formData)
        }) .then((response) => response.json())
            .then((result) => {
                this.setState({
                    items:result.data[0]
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={'2018-02-11'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // renderDay={(day, item) => this.renderItem.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        this.setState({
            items: { '2018-02-11':
                  [
                      {strTime: '2018-02-11',
                          operationName: '手术名称',
                          doctorName: '医生',
                          status: '状态 ' },
                      {strTime: '2018-02-11',
                          operationName: '手术名称',
                          doctorName: '医生',
                          status: '状态 ' },

                  ],
                '2018-02-12':
                    [ { strTime: '2018-02-12',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ],
                '2018-02-13':
                    [ { strTime: '2018-02-13',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ],
                '2018-02-14':
                    [ { strTime: '2018-02-14',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ],
                '2018-02-15':
                    [ { strTime: '2018-02-15',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ],
                '2018-02-16':
                    [ { strTime: '2018-02-16',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ],
                '2018-02-17':
                    [ { strTime: '2018-02-17',
                        operationName: '手术名称',
                        doctorName: '医生',
                        status: '状态 ' } ] }
        });
        console.log('this.state.items-----',this.state.items);
    }

    renderItem(items) {
        return (
            <View style={[styles.item]}>
                {/*<Text>{item.strTime}</Text>*/}
                {/*<Text>{item.operationName}</Text>*/}
                {/*<Text>{item.doctorName}</Text>*/}
                {/*<Text>{item.status}</Text>*/}
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}



const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection:'row',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
        backgroundColor:'red'
    }
});


