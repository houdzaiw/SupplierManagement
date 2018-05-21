import React, { Component } from 'react';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native';
import {Icon} from 'react-native-elements'

let Dimensions = require('Dimensions');
let ScreenWidth = Dimensions.get('window').width;


class operation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            ready:false,
            listData:{},//列表数据
        }
    }
    refreshing = false;
    fetchData(){
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        const { params } = this.props.navigation.state;
        let url = global.config.url+'/mobile/orderByDdh?ddh='+params.data+'&yyid='+global.config.user.yyid+'&userId='+global.config.user.id+'&userLx=1'
        console.log('url --------',url);
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    refreshing: false,
                    listData:response.data || {}
                });
                this.refreshing = false;

            })
            .catch((error) => {
                console.error(error);
            });
    };
    componentWillMount() {
        this.fetchData();
        this.setState({
            ready: true,
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#cccccc",

                }}
            />
        );
    };
    noMoreData=()=>{
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    }
    renderFooter = () => {

        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    };

    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('product_detail', {data: item});
        }

    };

    _toUpdateDlc = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_dlc',{data: item});
        }

    };

    renderWZRow(item){
        return(
            <View style={{
                marginBottom: 8, flexDirection: 'column', marginLeft:5,
            }}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
                    <Icon
                        name="alarm"
                        color='#517fa4'
                    />
                    <Text
                        onPress={() => this._onPress(item.id)}
                        style={{
                            fontSize: 16,
                            marginTop: 5,
                            color: '#000000',
                            width: 360,
                            marginLeft: 15,
                            marginRight: 25,
                            marginBottom: 5,
                        }}>名称:{item.wzmc || '暂无名称'} </Text>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    规格：{item.gg || '暂无规格'}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    型号：{item.xh || '暂无型号'}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    申请数量：{item.sqsl || 0}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    要求到货日期：{item.sqdh || '暂无到货日期'}
                </Text>

            </View>
        )
    }

    renderGJRow(item){
        return(
            <View style={{
                marginBottom: 8, flexDirection: 'column', marginLeft:5,
            }}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
                    <Icon
                        name="home"
                        color='#517fa4'
                    />
                    <Text
                        onPress={() => this._onPress(item.id)}
                        style={{
                            fontSize: 16,
                            marginTop: 5,
                            color: '#000000',
                            width: 360,
                            marginLeft: 15,
                            marginRight: 25,
                            marginBottom: 5,
                        }}>名称:{item.sbmc || '暂无名称'} </Text>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    简称：{item.sbjc || '暂无简称'}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    规格：{item.sbgg || '暂无规格'}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    批号：{item.ph || '暂无批号'}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#666666',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    数量：{item.sl || 0}
                </Text>

            </View>
        )
    }
    renderScrollableTabView(){
        return(
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#FDA313'>

                <View style={[styles.textStyle,{backgroundColor:'cyan'}]} tabLabel='物资'>
                    {/*物资页面*/}

                    <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                              data={this.state.listData.wzList}
                              renderItem={({item}) => this.renderWZRow(item)}
                              onRefresh={this.freshData}
                              onEndReached={this.fetchMore}
                              onEndReachedThreshold={0}
                              refreshing={this.state.refreshing}
                              ListFooterComponent={() => {
                                  return this.state.refreshing ?
                                      <ActivityIndicator size="large" /> : this.noMoreData();
                              }}
                              keyExtractor={item => item._id}
                        //分隔线组件
                              ItemSeparatorComponent={this.renderSeparator}
                        //设置为true则变为水平列表
                              horizontal={false}

                    />

                </View>

                <View style={styles.textStyle} tabLabel='工具'>
                    {/*工具页面*/}
                    <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                              data={this.state.listData.gjList}
                              renderItem={({item}) => this.renderGJRow(item)}
                              onRefresh={this.freshData}
                              onEndReached={this.fetchMore}
                              onEndReachedThreshold={0}
                              refreshing={this.state.refreshing}
                              ListFooterComponent={() => {
                                  return this.state.refreshing ?
                                      <ActivityIndicator size="large" /> : this.noMoreData();
                              }}
                              keyExtractor={item => item._id}
                        //分隔线组件
                              ItemSeparatorComponent={this.renderSeparator}
                        //设置为true则变为水平列表
                              horizontal={false}

                    />
                </View>
            </ScrollableTabView>
        )
    }

    render() {
        let listData = this.state.listData|| {}
        // console.log('listData.info----',listData.info)
        let info = listData.info || {}
        return (
            <View style={{flex:1}}>
                <View style={{
                    height:110,
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft:20,marginTop:15,flex:1}}>手术名称：{info.bz}</Text>
                        <TouchableOpacity onPress={()=>this._toUpdateDlc(info.jhdh)}>
                            <Text style={{marginTop:15,marginRight:20,color:"#FDA313"}}>查看订单流程</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginLeft:20,marginTop:15}}>手术时间:{info.cjsj}</Text>
                    <Text style={{marginLeft:20,marginTop:15,marginBottom:10}}>状态：{info.ddzt}</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#ccc'}}/>
                {this.renderScrollableTabView()}
            </View>
        );
    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    lineStyle: {
        width:ScreenWidth/2,
        height: 2,
        backgroundColor: '#FDA313',
    },
    textStyle: {
        flex: 1,
    },

});

export default operation;