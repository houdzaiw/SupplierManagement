import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
// http://idea.iteblog.com/key.php

LocaleConfig.locales['fr'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
};

LocaleConfig.defaultLocale = 'fr';
export default class agenda extends Component {
    static navigationOptions = {
        title: '订单',
        /*header:null,*/
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'#ccc'},
        headerLeft:<View/>,
    };
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            markDay:[],
            selectDay:'',
        };
    }
    componentWillMount(){
        this.setState({
            selectDay:this.formatDate(),
        })
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)//定时器清除
    }
    _toUpdateSsb = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('ssb',{data: item});
        }

    };
//默认时间为当前时间
    formatDate(){
        let date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) :d;
        let currenTime = y + '-' + m + '-' + d;
        return currenTime;
    };
    showdate(n,timestamp){
        var uom = new Date(new Date(timestamp)-0+n*86400000);
        uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate();
        return uom;
    }
    render() {
        return (
            <Agenda
                items={this.state.items&&this.state.items}
                loadItemsForMonth={this.loadItems}
                selected={this.formatDate()&&this.formatDate()}
                onDayPress={(day) => {
                    this.setState({
                        selectDay:day.dateString,
                    })
                    console.log('selected day', day)
                }}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                //在滚动议程列表的同时更改日期时调用的回调
                onDayChange = {(day)=> { console.log(' onDayChangexxxxpressed ',day)}}
                renderDay={(day, item) => this.renderItem.bind(this)}
                markedDates={this.state.markDay&&this.state.markDay}
            />
        );
    }
    fetchNetwork=(timestamp,dateString)=>{
        let ssrqStart = this.showdate(-3,timestamp);
        let ssrqEnd = this.showdate(3,timestamp);
        let selectDat = this.state.selectDay.length !== 0 && (this.state.selectDay === dateString)
        return new Promise((resolve,reject)=>{
            if (selectDat){
                //let url = 'http://118.190.157.145:8083/yywl-gyswl/mobile/order?userId='+global.config.user.id+'&yyid='+global.config.user.yyid+'&ssrqStart='+ssrqStart+'&ssrqEnd='+ssrqEnd+'&userLx='+global.config.user.yhlx
                //let url = `http://118.190.157.145:8083/yywl-gyswl/mobile/order?userId=9dd836c1-6b33-440b-a310-65089e4024a9&yyid=53010301&ssrqStart=2018-02-01&ssrqEnd=2018-02-07`
                let url = global.config.url+'/mobile/order'+'?userId='+global.config.user.id+'&yyid='+global.config.user.yyid+'&ssrqStart='+ssrqStart+'&ssrqEnd='+ssrqEnd+'&userLx=1'
                console.log('url ------',url);
                fetch(url, {
                    // method: 'POST',
                    headers: {
                        //'Content-Type': 'application/x-www-form-urlencoded',
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify(formData)
                }) .then((response) => resolve(response.json()))
                    .catch((error) => {
                        console.error(error);
                        reject({});
                    });
            }else {
                reject({})
            }
        })
    }

    loadItems=(day) => {
        console.log('day.timestamp ------',day.dateString);
        this.timer = setTimeout(()=>{
            this.fetchNetwork(day.timestamp,day.dateString).then((response) => {
                console.log('response ----', response)
                var newList = [];
                var newMarkDay = [];
                var num = 0;
                response.data.forEach((data,index)=>{
                    let time = data.info.ssrq.split(/\s+/)
                    data.info.ssrq1 = time[0]

                    for (var i = 0; i < newList.length; i++) {
                        if (newList[i].todayTime === data.info.ssrq1) {
                            newList[i].items.push(data.info);
                            return;
                        }
                    }

                    if(day.dateString == data.info.ssrq1){
                        num ++;
                        data.info.index = num;
                        newList.push(data.info);
                    }
                    if(newMarkDay.indexOf(data.info.ssrq1)==-1){
                        newMarkDay.push(data.info.ssrq1);
                    }
                });
                var obj = {};
                var pushArr = newMarkDay;
                for(var i=0;i<pushArr.length;i++) {
                    obj[pushArr[i]] = {marked: true};
                }
                var key1= [day.dateString];
                var val1 = newList || {};
                var obj1 = {};
                obj1[key1] = val1;

                var val2 = obj || {};
                var obj2 = {};
                obj2['markDay'] = val2;
                this.setState({
                    markDay:obj2,
                    items: obj1,
                });
                console.log('itemsxxx -----',this.state.items)
            })
        },500)
    }



    renderItem = (items) =>{
        console.log('items -----',items)
        return (
            <TouchableOpacity onPress={()=>this._toUpdateSsb(items.jhdh)}>
                <View style={[styles.itemaa]}>
                    <View
                        style={{
                            width:25,
                            height:25,
                            borderRadius:18,
                            borderWidth:1,
                            borderColor:'#EFBF55',
                            backgroundColor:'#EFBF55',
                            justifyContent:'center',

                        }}>
                        <Text style={{textAlign:'center',fontSize:10}}>{items.index}</Text>
                    </View>
                    {/*<Text>{items.ssrq1}</Text>*/}
                    <Text>{items.bz}</Text>
                    <Text>{items.jhdh}</Text>
                    <Text>{items.ddzt}</Text>
                </View>
            </TouchableOpacity>

        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{marginLeft:20,marginTop:20}}>今天没有手术信息！</Text>
            </View>
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
    itemaa: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection:'row',
        borderRadius: 5,
        padding: 10,
        marginTop:10,
        justifyContent:'space-around',
        alignItems:'center'
    },
    emptyDate: {
        height: 50,
        flex:1,
        backgroundColor:'#fff',
        marginTop:10,
    }
});


