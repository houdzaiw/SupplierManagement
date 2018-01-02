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
/*import orderdate from 'src/order/screens/order.date';
const {width, height} = Dimensions.get('window');*/




class orderlist extends Component {
    static navigationOptions = {
        title: '我的',
        header:null,
        titleStyle: {color: '#fff',},
        headerStyle:{backgroundColor:'#ccc',}
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            limit: 30,
            error: null,
            refreshing: false,
            showPop:false,
        }
    }
    componentWillMount() {
        this.fetchData();
    }
    componentDidMount() {

    }

    fetchData (){
        const {limit} = this.state;
        const url = 'http://rapapi.org/mockjsdata/26918/set';
        this.setState({loading: true});
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
            console.log('resoponse-----',response);
                this.setState({
                    data: response.data || {},
                    error: response.error || null,
                    loading: false,
                    refreshing: false
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



     _ToSearchorder() {
         let {navigate} = this.props.navigation;
         if (navigate) {
             navigate('order');
         }
     }
     _onPress = (item) => {
         const {navigate} = this.props.navigation;
         if (navigate) {
             navigate('product_detail', {data: item});
         }

     };
    _toUpdateDlc= () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_dlc');
        }

    };
    _toUpdateSp= () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('goods_sp');
        }

    };
    _toUpdateLg= () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('login');
        }

    };

    renderRow(rowData){
        console.log('rowdataspecifications-----',rowData.item);
        let time = ''
        let item = rowData.item || {};
        return(
            <View style={{/*marginBottom:10,*/paddingHorizontal:10,marginTop:10,}}>
                <View style={{flex:1,height:250,backgroundColor:'#fff'}}>
                    <View style={{height:50,flexDirection:'row',paddingHorizontal:20,alignItems:'center'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Icon style={{marginRight:10}} name="alarm" color="#0099CC" size={20}/>
                            <Text style={{textAlign:'center'}}>订单时间：{'2017-12-20 10：22'}</Text>
                        </View>
                        <Text style={{textAlign:'center',color:"#FDA313",}}>{/*item.price*/'处理中'}</Text>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height:1,backgroundColor:'#ccc'}}/>
                    <View style={{height:50,flexDirection:'row',paddingHorizontal:20,alignItems:'center'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Icon style={{marginRight:10}} name="home" color="#0099CC" size={20}/>
                            <TouchableOpacity onPress={this._toUpdateLg}>
                            <Text style={{textAlign:'center'}}>手术包名称：{item.number}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height:1,backgroundColor:'#ccc'}}/>
                    <View style={{height:50,flexDirection:'row',paddingHorizontal:20,alignItems:'center'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Icon style={{marginRight:10}} name="alarm" color="#0099CC" size={20}/>
                            <Text style={{textAlign:'center'}}>手术时间：{'2017-12-29 10：22'}</Text>
                        </View>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height:1,backgroundColor:'#ccc'}}/>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingHorizontal:20,height:50,}}>
                        <Image style={{width:40,height:40,marginRight:10}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
                        <TouchableOpacity onPress={this._toUpdateSp}>
                        <Text style={{fontSize:16,}}>
                            {item.name}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/*//中间划线*/}
                    <View style={{height:1,backgroundColor:'#ccc'}}/>
                    <View style={{alignItems: 'center', justifyContent: 'center',height:50,paddingHorizontal:20,}} >
                        <TouchableOpacity onPress={this._toUpdateDlc}>
                        <Text style={{fontSize:16,color:"#FDA313",}}>查看更多</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )

        return1111(
            <View style={{backgroundColor:'#fff',marginTop:10,/*paddingHorizontal:10,*/display: 'flex',flex:1,borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',
                marginLeft:10,marginRight:10,borderRadius: 5,}}>
                <View style={{flexDirection: 'row',borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',}}>
                    <View style={{ height: 50,width:40 ,}}>
                        <Icon style={{marginTop:15,marginLeft:10,}} name="alarm" color="#0099CC" size={20}/>
                    </View>
                    <View style={{flex: 1, height: 50, }}>
                        <Text style={{marginTop:20,}}>手术名称：{item.price}</Text>
                    </View>
                    <View style={{ height: 50,width:40,}}>
                        <Text style={{marginTop:20,fontSize:14,color:"#FDA313",}}>{item.price}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',}}>
                    <View style={{ height: 50,width:40 ,}}>
                        <Icon style={{marginTop:15,marginLeft:10}} name="home" color="#0099CC" size={20}/>
                    </View>
                    <View>
                        <Text style={{marginTop:20,}}>手术编号：{item.number}</Text>
                            </View>
                </View>
                <View style={{flexDirection: 'row',borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',}}>
                    <View style={{ height: 50,width:40 ,}}>
                        <Icon style={{marginTop:15,marginLeft:10}} name="folder-open" color="#0099CC" size={20}/>
                    </View>
                    <View>
                        <Text style={{marginTop:20,}}>手术时间：{item.number}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',borderColor:'#CCC',
                    borderStyle:'solid',backgroundColor:"#fff",borderWidth:0.5,height:60,
                }}>
                    <Image style={{width:40,height:40,marginLeft:10,marginTop:10,marginRight:10,}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
                    <TouchableOpacity onPress={this._toUpdateSp}>
                        <Text  style={{marginLeft:10,marginTop:20,fontSize:16,color:"#000",marginRight:60,}}>{item.number}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center',borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',}}>
                    <TouchableOpacity onPress={this._toUpdateDlc}>
                    <Text style={{fontSize:16,color:"#FDA313",}}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            /*<View style={{borderColor:'#ccc',backgroundColor:'#fff',marginLeft:10,marginRight:10,borderRadius: 3,
                borderStyle:'solid',
                marginTop:10,
                borderWidth:0.5,
            }}>

                <View style={styles.container}>
                    <View style={styles.text}><Icon name="alarm" color="#0099CC" size={20}/></View>
                    <Text style={styles.texts}>日期:{item.price}</Text>
                    <Text style={{marginLeft:170,marginTop:15,fontSize:14,color:"#FDA313"}}>{item.price}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.text}><Icon name="home" color="#0099CC" size={20}/></View>
                    <Text style={styles.texts} onPress={this._toUpdateLg}>手术编号：{item.number}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.text}><Icon name="folder-open" color="#0099CC" size={20}/></View>
                    <Text style={styles.texts}>手术编号：{item.number}</Text>
                </View>
                <View style={{ flexDirection: 'row',borderColor:'#CCC',
                    borderStyle:'solid',backgroundColor:"#fff",borderWidth:0.5,height:60,
                }}>
                    <Image style={{width:40,height:40,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
                    <TouchableOpacity onPress={this._toUpdateSp}>
                        <Text  style={{marginLeft:10,marginTop:15,fontSize:16,color:"#000",marginRight:60,}}>手术编号：{item.number}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center',borderWidth:0.5,borderColor:"#ccc",borderStyle:'solid',}}>
                    <TouchableOpacity onPress={this._toUpdateDlc}>
                        <Text style={{fontSize:16,color:"#FDA313",}}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            </View>*/
        )
    }
    render(){
        return(
            <View style={{marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{padding:10,backgroundColor:"#fff"}}>
                    <TitleBar  leftClick={() => {this._ToSearchorder()}} rightClick={() => { this.setState({ showPop: !this.state.showPop }) }}/>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={(rowData) => this.renderRow(rowData)}
                />
            </View>
        )
    }

    render1111() {

        return (
            <View style={{marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{padding:10,backgroundColor:"#fff"}}>
                    <TitleBar  leftClick={() => {this._ToSearchorder()}} rightClick={() => { this.setState({ showPop: !this.state.showPop }) }}/>
                </View>
                <FlatList
                          data={this.state.data}
                          renderItem={({item}) => (
                              <View style={{borderColor:'#ccc',backgroundColor:'#fff',marginLeft:10,marginRight:10,borderRadius: 3,
                                  borderStyle:'solid',
                                  marginTop:10,
                                  borderWidth:0.5,
                              }}>
                                  <View>
                                      <Text>lsdkfjlskdjf</Text>
                                  </View>
                                  <View style={styles.container}>
                                      <View style={styles.text}><Icon name="alarm" color="#0099CC" size={20}/></View>
                                      <Text style={styles.texts}>2017-12-4  10:50:07</Text>
                                      <Text style={{marginLeft:100,marginTop:15,fontSize:14,color:"#FDA313"}}>处理中</Text>
                                  </View>
                                  <View style={styles.container}>
                                      <View style={styles.text}><Icon name="home" color="#0099CC" size={20}/></View>
                                      <Text style={styles.texts} onPress={this._toUpdateLg}>手术包名</Text>
                                  </View>
                                  <View style={styles.container}>
                                      <View style={styles.text}><Icon name="folder-open" color="#0099CC" size={20}/></View>
                                      <Text style={styles.texts}>手术时间：2017-12-25</Text>
                                  </View>
                                  <View style={{ flexDirection: 'row',borderColor:'#CCC',
                                      borderStyle:'solid',backgroundColor:"#fff",borderWidth:0.5,height:60,
                                  }}>
                                      <Image style={{width:50,height:50,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
                                      <TouchableOpacity onPress={this._toUpdateSp}>
                                      <Text  style={{marginLeft:10,marginTop:15,fontSize:16,color:"#000",marginRight:60,}}>金属锁定接骨板  规格：直型锁定接骨板 | 684601-植入器材</Text>
                                      </TouchableOpacity>

                                  </View>
                                  <View style={styles.container}>
                                      <TouchableOpacity onPress={this._toUpdateDlc}>
                                      <Text  style={{fontSize:16,color:"#FDA313",marginLeft:150,marginTop:15,}}>查看进度</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>

                          )}
                          keyExtractor={item => item._id}
                    //分隔线组件
                          ItemSeparatorComponent={this.renderSeparator}
                    //结尾组件
                          ListFooterComponent={this.renderFooter}
                    //是否正在加载数据
                          refreshing={this.state.refreshing}

                          onEndReachedThreshold={30}
                    //设置为true则变为水平列表
                          horizontal={false}
                />
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor:'#ccc',
        borderStyle:'solid',
        /*marginTop:10,*/
        height:50,
        backgroundColor:"#fff",
        borderWidth:0.5,//改了边框的宽度0.5改为1
    },
    text:{
        marginLeft:10,
        marginTop:10,
    },
    button:{
        marginLeft:10,
        marginTop:10,
        fontSize:20,
    },
    view:{
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth:0.5,
        marginTop:210,
        height:50,
        backgroundColor:"#fff",
    },
    texts:{
        fontSize:17,
        marginLeft:10,
        marginTop:10,
        color:"#000"
    },
    tc:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        justifyContent: 'center',
        color:"#000",
    },
    AA:{
        flex: 1,
        backgroundColor: '#EFEFEF',


    },
});

export default orderlist;