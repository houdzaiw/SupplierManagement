import React,{ Component } from 'react'
import {
    ListView,
    FlatList,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    StyleSheet
} from 'react-native'
import {Icon} from 'react-native-elements'
import TitleBar from '../../component/TitleBar'
import TopBanner from '../../component/TopBanner'

const {width, height} = Dimensions.get('window')

import FilterPopWidows from '../../component/FilterPopWidows'

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
            limit: 30,
            error: null,
            refreshing: false,
            showPop:false,
        }
    }

    componentWillMount(){
        console.log('111111111111111111')
        this.fetchData();
    }
    componentDidMount() {

    }

    fetchData = () => {
        const {limit} = this.state;
        /*const url = 'http://rapapi.org/mockjsdata/26918/set';*/
        const url = 'http://localhost:8080/yywl-gyswl/mobile/listCp?name=&pageNo=1&size=10&yyid='+global.config.user.yyid;
        this.setState({loading: true});

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: response.data.list,
                    error: response.error || null,
                    loading: false,
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
            navigate('product_detail', {data: item});
        }

    };
    callbackSupplierPage(){
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('company');
        }
    }



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
                <TopBanner callBackSupplier={() => {this.callbackSupplierPage()}} active={3}/>
                <FlatList style={{backgroundColor: '#ffffff',}}
                          data={this.state.data}
                          renderItem={({item}) => (
                              <View style={{
                                  marginBottom: 8, flexDirection: 'column', marginLeft:5, //borderRadius:3, elevation:4,
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
                                          }}>{item.materialName/*name*/} </Text>
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
                                          <Text
                                              style={{
                                                  fontSize: 14,
                                                  marginTop: 5,
                                                  color: '#999999',
                                                  marginLeft: 5,
                                                  marginRight: 10,
                                                  marginBottom: 5,
                                              }}>
                                              {item.creatorId}
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

export default productsListScreen;