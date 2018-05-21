import React, { Component } from 'react';
import {
    ListView,
    FlatList,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import TitleBar from '../../component/TitleBar'
import TopBanner from '../../component/TopBanner'

const {width, height} = Dimensions.get('window')

import FilterPopWidows from '../../component/FilterPopWidows'

class companysListScreen extends Component {
    static navigationOptions = {
        title: '厂商',
        /*header:null,*/
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'#cccccc'}
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
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        // let url = `${api}?name=&pageNo=${start}&size=${count}&yyid=${global.config.user.yyid}`
        //let url = `http://localhost:8080/yywl-gyswl/mobile/listScs?name=${name}&pageNo=${pageNo}&size=${pageSize}&yyid=53010301`
        //let url = `http://localhost:8080/yywl-gyswl/mobile/listScs?name=&pageNo=1&size=10&yyid=53010301`
        let url = global.config.url+'/mobile/listScs'+'?name='+name+'&pageNo='+pageNo+'&size=5&yyid='+global.config.user.yyid+'&userId='+global.config.user.id+'&userLx=1'
        console.log('url ---- ',url);
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
            listData:[]
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
            navigate('search');
        }
    }
    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('company_detail', {data: item});
        }
    };


    callbackProductsPage1(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('Product');
        }
    }

    //跳供应商
    callbackSupplierPage2(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('Supplier');
        }
    }

    renderRow(item){
        return(
            <TouchableOpacity style={{
                marginBottom: 8, flexDirection: 'column', marginLeft:5,marginHorizontal:10,
            }} onPress={() => this._onPress(item.info.id)}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 12, marginRight: 10,}}>
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
                        }}>{item.cInfo.address}</Text>
                </View>

                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 5,
                        color: '#000000',
                        marginLeft: 15,
                        marginRight: 25,
                        marginBottom: 5,
                    }}>
                    {item.info.manufacturerName}
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
                    所属供应商：{item.info.manufacturerName}
                </Text>


                <View style={{flex: 1, flexDirection: 'row',paddingHorizontal:16}}>
                    <Text>主要物资：</Text>
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        {item.listcps.map((items,index)=>(
                            <Text style={{marginBottom:5,marginLeft:10,flex: 1,}}>
                                {items.materialName}
                            </Text>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    renderSearchView(){
        const {ready,page,size,canFetch}=this.state
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
    render() {
        const {ready,page,size,canFetch}=this.state
        return (
            <View style={{flex:1,backgroundColor:"#FFF",}}>
                <View style={{flexDirection:'row',backgroundColor:"#FFF",height:55,marginLeft:10}}>
                    {this.renderSearchView()}
                </View>
                <TopBanner callBackSupplier1={() => {this.callbackProductsPage1()}}
                           callBackSupplier2={() => {this.callbackSupplierPage2()}}
                           active={2}/>
                {
                    ready ?

                        <FlatList style={{flex:1,backgroundColor: '#ffffff'}}
                                  data={this.state.listData}
                                  renderItem={({item}) => this.renderRow(item)}
                                  onRefresh={this.freshData}
                                  onEndReached={()=>canFetch ? this.fetchMore(page,size):{}}
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
                />


            </View>
        );
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop:10,
    },
    inputText: {
        height: 30,
        borderWidth: 0,
        color:'#333333',
        marginLeft: 10,
        fontSize: 24,
    },
    contractStyle :{
        flexDirection:'row',
        marginTop:30,
        marginBottom:30,
        marginLeft:40,
        width:143,
    },
    selectImageStyle:{
        width: 22,
        height: 22,
        marginRight:9,
    },
    listViewStyle:{
        flexDirection:'row',
        height:30,
        backgroundColor:'cyan',
        marginTop:3,
        justifyContent:'center',
        alignItems:'center',
    },
    loading:{
        marginTop:100
    }

});
export default companysListScreen;
