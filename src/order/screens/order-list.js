import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';
import TitleBar from '../../component/TitleBar';
import OrderPopWindows from '../../component/OrderPopWindows'
import FilterPopWidows from "../../component/FilterPopWidows";
const {width, height} = Dimensions.get('window');




class orderlist extends Component {
    static navigationOptions = {
        title: '我的',
        header: null,
        titleStyle: {color: '#fff',},
        headerStyle: {backgroundColor: '#ccc',}
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            limit: 30,
            error: null,
            refreshing: false,
            showPop: false,
            keyboardInput:'',
        }
    }
    name = ''

    componentWillMount() {
        this.fetchData();
    }


    fetchData() {
        this.state.listDate=[];
        let name = this.state.keyboardInput || ''
        const {limit} = this.state;
        const url = global.config.url+'/mobile/order?name='+name+'&pageNo=1&size=10&yyid='+global.config.user.yyid;
        this.setState({loading: true});
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log('resoponse-----', response);
                this.setState({
                    data: response.data || {},
                    error: response.error || null,
                    refreshing: true
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    fetchSearch = () => {
        this.setState({
            listData:[]
        })
        this.fetchData();
    }


    _ToOrder() {
        let {navigate} = this.props.navigation;
        if (navigate) {
            navigate('order');
        }
    }

    _toUpdateDlc = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_dlc',{data: item});
        }

    };
    _toUpdateSp = () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('goods_sp');
        }

    };

    _toUpdateSsb = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('ssb',{data: item});
        }

    };

    _toUpdateRl = () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('agenda');
        }

    };

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

    renderRow(rowData) {
        let time = ''
        let item = rowData.item || {};
        return (
            <View style={{/*marginBottom:10,*/paddingHorizontal: 10, marginTop: 10,}}>
                <View style={{flex: 1, height: 250, backgroundColor: '#fff'}}>
                    <View style={{height: 50, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon style={{marginRight: 10}} name="alarm" color="#0099CC" size={20}/>
                            <TouchableOpacity onPress={this._toUpdateRl}>
                            <Text style={{textAlign: 'center'}}>订单时间：{item.info.cjsj}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{textAlign: 'center', color: "#FDA313",}}>{item.info.ddzt}</Text>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height: 1, backgroundColor: '#ccc'}}/>
                    <View style={{height: 50, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon style={{marginRight: 10}} name="home" color="#0099CC" size={20}/>
                            <Text style={{textAlign: 'center'}}>手术包名称：{item.info.ssmc}</Text>
                        </View>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height: 1, backgroundColor: '#ccc'}}/>
                    <View style={{height: 50, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon style={{marginRight: 10}} name="alarm" color="#0099CC" size={20}/>
                            <Text style={{textAlign: 'center'}}>手术时间：{item.info.ssrq}</Text>
                        </View>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height: 1, backgroundColor: '#ccc'}}/>
                    <View style={{height: 50, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon style={{marginRight: 10}} name="map" color="#0099CC" size={20}/>
                            <TouchableOpacity onPress={()=>this._toUpdateSsb(item.info.jhdh)}>
                            <Text style={{textAlign: 'center'}}>手术包详情：{item.info.ssmc}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*//中间划线*/}
                    <View style={{height: 1, backgroundColor: '#ccc'}}/>
                    <View style={{alignItems: 'center', justifyContent: 'center', height: 50, paddingHorizontal: 20,flexDirection: 'row',}}>
                        <TouchableOpacity onPress={()=>this._toUpdateDlc(item.info.jhdh)}>
                            <Text style={{fontSize: 16, color: "#FDA313",}}>查看更多</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )


    }

//产品详情
/*<View style={{height: 1, backgroundColor: '#ccc'}}/>
<View style={{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
}}>
    <Image style={{width: 40, height: 40, marginRight: 10}}
           source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
    <TouchableOpacity onPress={this._toUpdateSp}>
        <Text style={{fontSize: 16,}}>
            {item.info.ssmc}
        </Text>
    </TouchableOpacity>
</View>*/

    render() {
        return (
            <View style={{marginTop: global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{padding: 10, backgroundColor: "#fff"}}>
                    <View style={{flexDirection:'row',backgroundColor:"#FFF",height:55,}}>
                        {this.renderSearchView()}
                    </View>
                </View>
                <FlatList
                data={this.state.data}
                renderItem={(rowData) => this.renderRow(rowData)}
                onEndReachedThreshold={0}//决定当距离内容最底部还有多远时触发onEndReached回调
                refreshing={this.state.refreshing}//在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。
                ListFooterComponent={this.renderFooter}//底部组件
                keyExtractor={item => item._id}
                    //分隔线组件
                ItemSeparatorComponent={this.renderSeparator}
                    //设置为true则变为水平列表
                horizontal={false}
            />

                <OrderPopWindows
                    ref={(ref) => this.alert = ref }
                    callBackParam={(text)=>{
                        this.setState({
                            backParam:text,
                        })
                    }}
                />
            </View>
        )
    }

}



export default orderlist;
