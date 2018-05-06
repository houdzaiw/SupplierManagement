import React,{ Component } from 'react'
import {
    FlatList,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import {Icon} from 'react-native-elements'
import TitleBar from '../../component/TitleBar'
import TopBanner from '../../component/TopBanner'

const {ScreenWidth, ScreenHeight} = Dimensions.get('window')

import FilterPopWidows from '../../component/FilterPopWidows'
const {width, height} = Dimensions.get('window');




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
            refreshing: false,
            ready:false,
            listData:[],//列表数据
            //backParam:'',
            keyboardInput:'',
        }
    }
    refreshing = false;
    pageNo = 1;
    pageSize = 5;
    name = ''
    fetchData = (name,pageNo, pageSize) => {
        this.state.listDate=[];
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        // let url = `${api}?name=&pageNo=${start}&size=${count}&yyid=${global.config.user.yyid}`
        //let url = `http://localhost:8080/yywl-gyswl/mobile/listCp?name=${name}&pageNo=${pageNo}&size=${pageSize}&yyid=53010301`
        let url = global.config.url+'/mobile/listCp'+'?name='+name+'&pageNo='+pageNo+'&size=5&yyid='+global.config.user.yyid+'&userId='+global.config.user.id+'&userLx=2'
        console.log('url ------',url)
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
            console.log('response-xxx--',response)
                    this.setState({
                        refreshing: false,
                    });
                    this.refreshing = false;
                    if (response.data.list.length ===0) return;
                    return response;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    freshData = async () => {
        const responseData = await this.fetchData(this.name = this.state.keyboardInput,pageNo = 1,pageSize = 5);
        // alert('11111111111')
        this.setState({
            listData: responseData.data.list,
        });
    };
    fetchMore = async () => {
        // alert('2222222')
        const responseData = await this.fetchData(this.name = this.state.keyboardInput,this.pageNo, this.pageSize);
        if (responseData && responseData.data.list.length !== 0) {
            this.pageNo += 1;
            this.setState({
                listData: this.state.listData.concat(responseData.data.list),
            });

        }
    };
    fetchSearch = async() => {
        this.setState({
            listData:[],
        })
        this.pageNo = 1
        await this.fetchMore();
        this.setState({
            canFetch:false,
        })
    }
    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            ready: true,
            canFetch:false,
        });
    }

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
    noMoreData=()=>{
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    }

    _ToSearch() {
        let {navigate} = this.props.navigation;
        if (navigate) {
            //将this.state.backParam 复制给data，再将data传递到search页
            navigate('search',{data:this.state.backParam});
        }
    }
    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('product_detail', {data: item});
        }

    };
//跳厂商
    callbackSupplierPage(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('company');
        }
    }
//跳供应商
    callbackSupplierPage2(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('Supplier');
        }
    }


    renderSearchView(){
        return(
            <View style={{ flexDirection: 'row',backgroundColor:'#fff',padding:10, justifyContent: 'center', alignItems: 'center',width:width,}}>
                <View style={{width:width*0.8,flexDirection: 'row',backgroundColor:"#ccc",paddingLeft:5,}}>
                    <Icon  name="search" size={20}/>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输入搜索内容"
                        style={{height: 36,width:250, backgroundColor:'#ccc', borderRadius: 5,flexDirection: 'row',flex:1}}
                        onChangeText={(input) => {
                            this.setState({
                                keyboardInput:input
                            })
                        }}
                        clearButtonMode='always'
                        autoFocus={false}
                        value={this.state.value}
                    />
                </View>
                <TouchableOpacity style={{backgroundColor:"#ccc",height:36,width:40,marginLeft:5,marginRight:20}}  onPress={this.fetchSearch}>
                    <Text style={{marginTop:10,marginLeft:5}} >搜索</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderRow(item){
        return(
            <TouchableOpacity style={{
                marginBottom: 8, flexDirection: 'column', marginLeft:5,
            }} onPress={() => this._onPress(item.id)}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='#517fa4'
                    />
                    <Text
                        style={{
                            fontSize: 18,
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
                            {item.middleLabel}
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
                            {item.unitPrice}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row',marginLeft:15,}}>
                        <Icon
                            name='add'
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
                            {item.packingUnit}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let {ready,page,size,canFetch,isiOS}=this.state
        return (
            <View style={{flex:1,backgroundColor:"#FFF",marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{flexDirection:'row',backgroundColor:"#FFF",height:55,marginLeft:10}}>
                    {this.renderSearchView()}
                </View>
                <TopBanner callBackSupplier={() => {this.callbackSupplierPage()}} callBackSupplier2={() => {this.callbackSupplierPage2()}}
                           active={3}/>

                {
                    ready ?
                <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                          data={this.state.listData}
                          renderItem={({item}) => this.renderRow(item)}
                          onRefresh={this.freshData}//如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能
                          onEndReached={()=>canFetch ? this.fetchMore(page,size):{}}//当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
                          onEndReachedThreshold={isiOS?0:0.1}//决定当距离内容最底部还有多远时触发onEndReached回调
                          refreshing={this.state.refreshing}//在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。
                          ListFooterComponent={() => {
                              return this.state.refreshing ?
                                  <ActivityIndicator size="large" /> : this.noMoreData();
                          }}//底部组件
                          keyExtractor={item => item._id}
                    //分隔线组件
                          ItemSeparatorComponent={this.renderSeparator}
                    //设置为true则变为水平列表
                          horizontal={false}

                />
                        :
                        < ActivityIndicator size="large" style={styles.loading}/>
                }

                <FilterPopWidows
                    ref={(ref) => this.alert = ref }
                    callBackParam={(text)=>{
                        this.setState({
                            backParam:text,
                        })
                    }}
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
    },
    loading:{
        marginTop:100
    }
});

