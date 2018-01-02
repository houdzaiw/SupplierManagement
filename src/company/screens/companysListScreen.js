import React, { Component } from 'react';
import {
    ListView,
    FlatList,
    Text,
    View,
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
    // 初始化模拟数据
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
        /*const url = 'http://rapapi.org/mockjsdata/27765/AAA';*/
        const url = 'http://localhost:8080/yywl-gyswl/mobile/listScs?name=&pageNo=1&size=10&yyid='+global.config.user.yyid;
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
            navigate('company_detail', {data: item});
        }
    };

    render() {
        return (
            <View>
                <View style={{padding:10,backgroundColor: '#ffffff'}}>
                    <TitleBar  leftClick={() => {this._ToSearch()}} rightClick={() => { this.setState({ showPop: !this.state.showPop }) }}/>
                </View>
                <View style={{ position: 'absolute', top: 55, left: 0, width: width, height: height }}>
                    <FilterPopWidows show={this.state.showPop} closeModal={(show) => {
                        this.setState({showPop: show})
                    }} {...this.props}/>
                </View>
                <TopBanner active={2}/>
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
                                      }}>{item.cInfo.address}</Text>
                              </View>

                                  <Text
                                      onPress={() => this._onPress(item.info.id)}
                                      style={{
                                          fontSize: 20,
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

                                  <View style={{flex: 1, flexDirection: 'row',marginRight:20,}}>
                                      <Text
                                          style={{
                                              fontSize: 14,
                                              marginTop: 5,
                                              color: '#000000',
                                              marginLeft: 15,
                                              marginBottom: 5,
                                          }}>
                                          主要物资：</Text>


                                      {item.listcps.map((itemc, i) =>
                                          <View style={{
                                              fontSize: 14,
                                              marginTop: 5,
                                              color: '#000000',
                                              marginRight: 25,
                                              marginBottom: 5,
                                          }}>
                                              <Text style={{fontSize: 14,  color: '#000000',}}>
                                                  {itemc.materialName}
                                              </Text>
                                          </View>
                                      )
                                      }
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

});
export default companysListScreen;