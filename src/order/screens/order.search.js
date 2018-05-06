
import React, { Component } from 'react';
import { AppRegistry, TextInput ,View,Text,Button, Alert,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import MySorage from '../../component/MySorage';

class ordersearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ls_data: [{name: '金属锁定接骨板'}, {name: '脊柱后路钉棒系统'}, {name: '金属锁定接骨板'}],
        }
    }
    componentDidMount() {
        let me=this;
        MySorage._load("keyword",function(data){
            if(data&&data.length>0)
                me.setState({ls_data:data});
        });
    }
    _ToSearchList() {
        if(!this.state.keyword){
            Alert.alert('温馨提醒','搜索关键字不能为空');
            return;
        }
        let me=this;
        MySorage._load("keyword",function(data){
            Alert.alert('温馨提醒','111');
            console.info(data);
            if(!data){
                data=[];
            }
            data.push({name:me.state.keyword});
            MySorage._sava("keyword",data);
            let {navigate} = me.props.navigation;
            if (navigate) {
                navigate('search_list');
            }
        });
    }
    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(item) {
        return (
            <View style={styles.item}>
                <View style={styles.icon}><Icon name="add" size={20}  /></View>
                <Text style={styles.text}>{item.name}</Text>
                <Icon name="add" size={20}/>
            </View>
        );
    }
    backHomePage=()=>{
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={{marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
            <View style={{ backgroundColor:'#FFF'}}>
                <View style={{ flexDirection: 'row',backgroundColor:'#FFF',padding:10, justifyContent: 'center', alignItems: 'center',}}>
                    <TouchableOpacity style={{marginRight:5,}} >
                        <Icon name='arrow-back' size={24} onPress={this.backHomePage} />
                    </TouchableOpacity>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输入搜索内容"
                        style={{height: 36, backgroundColor:'#ccc', borderRadius: 5,flexDirection: 'row',flex:1}}
                        onChangeText={(input) => this.setState({keyword: input})}
                    />
                    <View style={{width:55,height:32,flexDirection: 'row',textAlign:'right',justifyContent: 'center', alignItems: 'center',
                        backgroundColor:'#FDA313',marginRight:5,}}>
                        <Button
                            onPress={() => {this._ToSearchList()}}
                            title="搜索"
                            color='#ffffff'
                        />
                    </View>
                </View>
                {this.renderList(this.state.ls_data)}
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        padding:10,
        borderTopWidth:1,
        borderTopColor:'#ccc'
    },
    icon:{
        flexDirection: 'row',
        width:50,
    },
    text:{
        flexDirection: 'row',
        flex:1,
    },

});
export default ordersearch;