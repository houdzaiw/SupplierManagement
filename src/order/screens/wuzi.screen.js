import React,{ Component } from 'react'
import {
    FlatList,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    RefreshControl
} from 'react-native'
import {Icon} from 'react-native-elements'
const {ScreenWidth, ScreenHeight} = Dimensions.get('window')

import FilterPopWidows from '../../component/FilterPopWidows'


const api = 'http://localhost:8080/yywl-gyswl/mobile/listCp';


class wuzi extends Component {
    static navigationOptions = {
        title: '物资',
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'red'}
    };
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            ready:false,
            listData:[],//列表数据
        }
    }
    refreshing = false;
    pageNo = 1;
    pageSize = 5;
    fetchData = (pageNo, pageSize) => {
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        // let url = `${api}?name=&pageNo=${start}&size=${count}&yyid=${global.config.user.yyid}`
        let url = `http://localhost:8080/yywl-gyswl/mobile/listCp?name=&pageNo=${pageNo}&size=${pageSize}&yyid=53010301`
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    refreshing: false,
                });
                this.refreshing = false;
                return (response.data.list.length !==0) && response;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    freshData = async () => {
        const responseData = await this.fetchData(pageNo = 1,pageSize = 5);
        this.setState({
            listData: responseData.data.list,
        });
    };
    fetchMore = async () => {
        const responseData = await this.fetchData(this.pageNo, this.pageSize);
        if (responseData && responseData.data.list.length !== 0) {
            console.log('responseData---',responseData)
            this.pageNo += 1;
            this.setState({
                listData: this.state.listData.concat(responseData.data.list),
            });
        }
    };
    async componentDidMount() {
        await this.fetchMore();
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



    renderRow(item){
        return(
            <View style={{
                marginBottom: 8, flexDirection: 'column', marginLeft:5,
            }}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
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
                        }}>{item.materialName} </Text>
                </View>

            </View>
        )
    }
    render() {
        const {ready}=this.state
        return (
            <View style={{flex:1,marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                          data={this.state.listData}
                          renderItem={({item}) => this.renderRow(item)}
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
        );
    }

}

export default wuzi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    loading:{
        marginTop:100
    }
});

