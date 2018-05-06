import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions,
    TouchableHighlight
} from 'react-native'
import {Icon} from 'react-native-elements'
import TitleBar from '../../component/TitleBar'
import TopBanner from '../../component/TopBanner'

const {width, height} = Dimensions.get('window')
import FilterPopWidows from '../../component/FilterPopWidows'


class supplierlistscreen extends Component {

    static navigationOptions = {
        title: '供应商',
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
            keyboardInput:'',
        }
    }
    refreshing = false;
    pageNo = 1;
    pageSize = 5;
    fetchData = (pageNo, pageSize) => {
        this.state.listDate=[];
        let name = this.state.keyboardInput || ''
        if (this.refreshing) {
            return;
        }
        if (this.pageNo > 1){
            this.setState({
                refreshing: true,
            });

        }
        this.refreshing = true;
        // let url = `${api}?name=&pageNo=${start}&size=${count}&yyid=${global.config.user.yyid}`
        //let url = `http://localhost:8080/yywl-gyswl/mobile/listGys?name=${name}&pageNo=${pageNo}&size=${pageSize}&yyid=53010301`
        //let url = 'http://localhost:8080/yywl-gyswl/mobile/listGys?name=&pageNo=1&size=10&yyid=53010301'
        //let url = global.config.url+'/mobile/listGys'+'?name='+name+'&pageNo='+pageNo+'&size=5&yyid='+global.config.user.yyid+'&userId='+global.config.user.id+'&userLx='+global.config.user.yhlx
        let url = global.config.url+'/mobile/listGys'+'?name='+name+'&pageNo='+pageNo+'&size=5&yyid='+global.config.user.yyid+'&userId='+global.config.user.id+'&userLx=2'
        console.log('url ------',url)
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    refreshing: false,
                });
                this.refreshing = false;
                let data = response.data || []
                let list = data.list || []
                return (list.length !==0) && response;
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
            //将this.state.backParam 复制给data，再将data传递到search页
            navigate('search',{data:this.state.backParam});
        }
    }
    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('supplier_detail', {data: item});
        }

    };
    callbackSupplierPage(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('company');
        }
    }

    callbackProductsPage1(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('Product');
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
            }} onPress={() => this._onPress(item.info.id)}>
                <View
                    style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='#517fa4'
                    />
                    <Text
                        style={{
                            fontSize: 14,
                            marginTop: 5,
                            color: '#999999',
                            width: 360,
                            marginLeft: 15,
                            marginRight: 25,
                            marginBottom: 5,
                        }}>{item.info.address}</Text>
                </View>

                <Text
                    //onPress={() => this._onPress(item.info.id)}
                    // onPress={() => navigate('supplier_detail', { user: 'Lucy' })}
                    style={{
                        fontSize: 18,
                        marginTop: 5,
                        color: '#000',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    名称：{item.info.supplierName}
                </Text>

                <View style={{flex: 1, flexDirection: 'row',}}>
                    <Text style={{
                        fontSize: 14,
                        marginTop: 5,
                        color: '#000',
                        marginLeft: 15,
                        marginBottom: 5,
                    }}>
                        下辖厂商：
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            marginTop: 5,
                            color: '#000',
                            marginRight: 25,
                            marginBottom: 5,
                        }}>
                        {item.info.supplierName}
                    </Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row',paddingHorizontal:18}}>
                    <Text>物资：</Text>
                    <View>
                        {item.listcps.map((items,index)=>(
                            <Text>
                                {items.manufacturerName}
                            </Text>
                        ))}
                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginLeft: 12,flex: 1,}}>
                    <Icon
                        name='person'
                        color='#666666'
                    />
                    <Text
                        numberOfLines={1}

                        style={{

                            fontSize: 14,
                            marginTop: 15,
                            color: '#999999',
                            marginLeft: 5,
                            marginRight: 10,
                        }}>
                        {item.info.legalRepresentative}
                    </Text>

                    <View style={{flex: 1, flexDirection: 'row',marginLeft :25 }}>
                        <Icon
                            name='call'
                            color='#666666'
                        />
                        <Text
                            numberOfLines={1}
                            style={{
                                flex: 1,
                                fontSize: 14,
                                marginTop: 15,
                                color: '#999999',
                                marginLeft: 5,

                            }}>
                            {item.info.telephone}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginLeft:12}}>
                    <Icon
                        name='g-translate'
                        color='#666666'
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            fontSize: 14,
                            marginTop: 5,
                            color: '#999999',
                            marginLeft: 5,
                            marginBottom: 5,
                        }}>
                        {item.info.middleLabel}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const {schoolList,isRefreshing,ready,page,size,canFetch}=this.state
        if(schoolList && schoolList.length > 0){}
        return (
            <View style={{flex:1,backgroundColor:"#FFF",marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{flexDirection:'row',backgroundColor:"#FFF",height:55,marginLeft:10}}>
                    {this.renderSearchView()}
                </View>
                <TopBanner callBackSupplier={() => {this.callbackSupplierPage()}}  callBackSupplier1={() => {this.callbackProductsPage1()}} active={1}/>

                {
                    ready ?
                        <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                                  data={this.state.listData}
                                  renderItem={({item}) => this.renderRow(item)}
                                  onRefresh={this.freshData}
                                  //onEndReached={this.fetchMore}
                                  onEndReached={()=>canFetch ? this.fetchMore(page,size):{}}//上拉加载判断拉取不到数据的时候 就不用拉取了
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
export default supplierlistscreen;

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
