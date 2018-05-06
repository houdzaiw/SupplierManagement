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
import TitleBar from '../../component/TitleBar'
import TopBanner from '../../component/TopBanner'

const {ScreenWidth, ScreenHeight} = Dimensions.get('window')

import FilterPopWidows from '../../component/FilterPopWidows'


let pageNo = 0;//当前第几页
let totalPage=5;//总的页数

class productsListScreen extends Component {



    static navigationOptions = {
        title: '产品',
        header:null,
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'red'}
    };
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            pageSize:5,
            error: null,
            refreshing: false,
            showPop:false,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false//下拉控制
        }
    }



    componentDidMount() {
        //请求数据
       const url = 'http://localhost:8080/yywl-gyswl/mobile/listCp?name=&pageNo=1&size='+this.state.pageSize+'&yyid='+global.config.user.yyid;

         fetch(url)
             .then((response) => response.json())
             .then((response) => {
                     this.setState({
                     data: [],
                    error: response.error || null,
                     loading: false,
                   totalPage: response.data.pager.pageCount,
                  showFoot:0,
                    refreshing: false
               });

            })
           .catch((error) => {
                 console.error(error);
             });
        this.pageNo=0;
     }


    _onEndReached = () => {
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.pageNo!=1) && (this.pageNo>=this.state.totalPage)){
            return;
        } else {
            this.pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this.fetchData( this.pageNo );
    };



    fetchData = (pageNo) => {
        const {limit} = this.state;
        console.log('pageNo ----',pageNo);
        /*const url = 'http://rapapi.org/mockjsdata/26918/set';*/
        const url = 'http://localhost:8080/yywl-gyswl/mobile/listCp?name=&pageNo='+pageNo+'&size='+this.state.pageSize+'&yyid='+global.config.user.yyid;
        this.setState({loading: true});

        let foot = 0;
        if(pageNo>=this.state.totalPage){
            foot = 1;//listView底部显示没有更多数据了
        }
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log('response----->',response);
                let dataList=this.state.data.concat(response.data.list);
                this.setState({
                    data: dataList,
                    error: response.error || null,
                    loading: false,
                    totalPage: response.data.pager.pageCount,
                    showFoot:foot,
                    refreshing: false
                });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: "100%",
                    backgroundColor: "#cccccc",

                }}
            />
        );
    };

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
    _ToSearch() {
        let {navigate} = this.props.navigation;
        if (navigate) {
            navigate('search');
        }
    }
    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('product_detail', {data: item});
        }

    };

    callbackSupplierPage(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('company');
        }
    }


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
                            fontSize: 20,
                            marginTop: 5,
                            color: '#000000',
                            width: 360,
                            marginLeft: 15,
                            marginRight: 25,
                            marginBottom: 5,
                        }}>{item.materialName} </Text>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#000000',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    规格：{item.specifications}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#000000',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    厂商：{item.manufacturerName}
                </Text>

                <View style={{flex: 1, flexDirection: 'row', marginRight:10,marginLeft:15,}}>
                    <View style={{ flexDirection: 'row',}}>
                        <Icon
                            name='print'
                            color='#666666'
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 5,
                                color: '#999999',
                                marginLeft: 5,
                                marginRight: 20,
                                marginBottom: 5,
                            }}>
                            {item.unitPrice}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row',marginLeft:10,}}>
                        <Icon
                            name='map'
                            color='#666666'
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 5,
                                color: '#999999',
                                marginLeft: 5,
                                marginRight: 10,
                                marginBottom: 5,
                            }}>
                            {item.middleLabel}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row',marginLeft:15,}}>
                        <Icon
                            name='add'
                            color='#666666'
                        />
                       /* <Text
                            style={{
                                fontSize: 14,
                                marginTop: 5,
                                color: '#999999',
                                marginLeft: 5,
                                marginRight: 10,
                                marginBottom: 5,
                            }}>
                            {item.creatorId}
                        </Text>*/
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{flex:1,marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{padding:10,backgroundColor:"#fff"}}>
                    <TitleBar  leftClick={() => {this._ToSearch()}} rightClick={() => {
                        this.alert.openModal(true)
                    }}/>
                </View>
                <TopBanner callBackSupplier={() => {this.callbackSupplierPage()}} active={3}/>
                <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                          data={this.state.data}
                          renderItem={({item}) => this.renderRow(item)}
                          keyExtractor={item => item._id}
                    //分隔线组件
                          ItemSeparatorComponent={this.renderSeparator}
                    //结尾组件
                          ListFooterComponent={this.renderFooter}
                    //是否正在加载数据
                          refreshing={this.state.refreshing}
                          onRefresh = {()=>{
                              <RefreshControl
                                  refreshing={false}
                                  onRefresh={()=>{
                                      this.fetchData(1);
                                  }}
                                  title="下拉刷新"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor={'white'}
                              />
                          }}
                          onEndReached={()=>this._onEndReached()}

                          onEndReachedThreshold={1}//距离底部30个像素执行上拉刷新
                    //设置为true则变为水平列表
                          horizontal={false}

                />
                {/*<View style={{ position: 'absolute', top: 155, left: 0, width: ScreenWidth, height: ScreenHeight }}>*/}
                    {/**/}
                {/*</View>*/}
                <FilterPopWidows
                    ref={(ref) => this.alert = ref }

                />

            </View>
        );
    }

}

export default productsListScreen;

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
    }
});
