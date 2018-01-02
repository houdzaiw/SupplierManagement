import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
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
            loading: false,
            data: [],
            limit: 30,
            error: null,
            refreshing: false,
            showPop:false,
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const {limit} = this.state;
        const url = 'http://localhost:8080/yywl-gyswl/mobile/listGys?name=&pageNo=1&size=10&yyid='+global.config.user.yyid;
        /*const url = 'http://192.168.100.245:8080/yywl-hospital/api/listjson';*/
        this.setState({loading: true});

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: response.data.list,
                    error: response.error || null,
                    loading: false,
                    refreshing: false,
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
    _ToSearch() {
        let {navigate} = this.props.navigation;
        if (navigate) {
            navigate('search');
        }
    }
    _onPress = (item) => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('supplier_detail', {data: item});
        }

    };

    render() {
        return (
            <View style={{marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
                <View style={{padding:10,backgroundColor:"#fff"}}>
                    <TitleBar  leftClick={() => {this._ToSearch()}} rightClick={() => { this.setState({ showPop: !this.state.showPop }) }}/>
                </View>
                <View style={{ position: 'absolute', top: 55, left: 0, width: width, height: height }}>
                    <FilterPopWidows show={this.state.showPop} closeModal={(show) => {
                        this.setState({showPop: show})
                    }} {...this.props}/>
                </View>
                <TopBanner callBackSupplier={() => {this.callbackSupplierPage()}} active={1}/>
                <FlatList style={{backgroundColor: '#ffffff',}}
                          data={this.state.data}
                          renderItem={({item}) => (
                              <View style={{
                                  marginBottom: 8, flexDirection: 'column',  //borderRadius:3, elevation:4,
                              }}>
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
                                          }}>{item.info.address}</Text>
                                  </View>

                                  <Text
                                      onPress={() => this._onPress(item.info.id)}
                                      // onPress={() => navigate('supplier_detail', { user: 'Lucy' })}
                                      style={{
                                          fontSize: 20,
                                          marginTop: 5,
                                          color: '#000000',
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
                                      color: '#000000',
                                      marginLeft: 15,
                                      marginBottom: 5,}}>
                                      下辖厂商：
                                  </Text>

                                  <Text
                                      style={{
                                          fontSize: 14,
                                          marginTop: 5,
                                          color: '#000000',
                                          marginRight: 25,
                                          marginBottom: 5,
                                      }}>
                                      {item.info.supplierName}
                                  </Text>
                                  </View>

                                  <View style={{flex: 1, flexDirection: 'row',}}>
                                  <Text
                                      style={{
                                          fontSize: 14,
                                          marginTop: 5,
                                          color: '#000000',
                                          marginLeft: 15,
                                          marginBottom: 5,}}>物资：</Text>


                                  {item.listcps.map((itemc, i) =>
                                      <View style={{
                                          fontSize: 14,
                                          marginTop: 5,
                                          color: '#000000',
                                          marginRight: 25,
                                          marginBottom: 5,
                                      }}>
                                          <Text>{itemc.manufacturerName}</Text>
                                      </View>
                                  )
                                  }
                                  </View>


                                  <View style={{flex: 1, flexDirection: 'row', marginLeft: 12,}}>
                                      <Icon
                                          name='timer'
                                          color='#666666'
                                      />
                                      <Text
                                          style={{
                                              fontSize: 14,
                                              marginTop: 15,
                                              color: '#999999',
                                              marginLeft: 10,
                                              marginRight: 15,
                                              marginBottom: 5,
                                          }}>
                                          {item.info.legalRepresentative}
                                      </Text>

                                      <View style={{flex: 1, flexDirection: 'row',}}>
                                          <Icon
                                              name='g-translate'
                                              color='#666666'
                                          />
                                          <Text
                                              style={{
                                                  fontSize: 14,
                                                  marginTop: 15,
                                                  color: '#999999',
                                                  marginLeft: 10,
                                                  marginRight: 15,
                                                  marginBottom: 5,
                                              }}>
                                              {item.info.gysdm}
                                          </Text>
                                      </View>

                                      <View style={{flex: 1, flexDirection: 'row', marginRight: 20,}}>
                                          <Icon
                                              name='call'
                                              color='#666666'
                                          />
                                          <Text
                                              style={{
                                                  fontSize: 14,
                                                  marginTop: 15,
                                                  color: '#999999',
                                                  marginLeft: 5,
                                                  marginRight: 15,
                                                  marginBottom: 5,
                                              }}>
                                              {item.info.telephone}
                                          </Text>
                                      </View>
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
export default supplierlistscreen;