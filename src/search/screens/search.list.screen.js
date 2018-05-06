import React, {Component} from 'react';
import {AppRegistry, TextInput, View, Text, Button, StyleSheet,TouchableHighlight, FlatList,ActivityIndicator,} from 'react-native';
import {Icon} from 'react-native-elements';

class searchlistscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive:1,
            loading: false,
            data:[],
            error: null,
            refreshing: false,

        }
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

    render() {
        return (
            <View  style={{backgroundColor: '#FFF',flex: 1, }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#FFF',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 55
                    }}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="请输入搜索内容"
                            style={{
                                height: 35,
                                backgroundColor: '#ccc',
                                borderRadius: 5,
                                flexDirection: 'row',
                                flex: 1
                            }}
                            onChangeText={(input) => this.setState({username: input})}
                        />
                        <View style={{
                            width: 50,
                            height: 35,
                            flexDirection: 'row',
                            textAlign: 'right',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button
                                title="搜索"
                                //color="#cccccc"
                            />
                        </View>
                    </View>
                <View style={{flexDirection: 'row',height:40,width:'100%'}}>
                    <TouchableHighlight underlayColor="rgb(210, 230,255)"
                                        activeOpacity={0.5}    style={[styles.tab,this.state.isActive==1? styles.active:null]} onPress={() => this.setState({isActive:1})}>
                        <View>
                            <Text >供应商</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgb(210, 230,255)"
                                        activeOpacity={0.5}    style={[styles.tab,this.state.isActive==2? styles.active:null]}  onPress={() => this.setState({isActive:2})}>
                        <View>
                            <Text >厂商</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgb(210, 230,255)"
                                        activeOpacity={0.5}    style={[styles.tab,this.state.isActive==3? styles.active:null]}  onPress={() => this.setState({isActive:3})}>
                        <View>
                            <Text >物资</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <FlatList style={this.state.isActive==1? {display:'flex'}:{display:'none'}}
                              data={this.state.data}
                              renderItem={({item}) => (
                                  <View style={{
                                      marginBottom: 8, flexDirection: 'column',  //borderRadius:3, elevation:4,
                                  }}>
                                      <View style={{
                                          flex: 1,
                                          flexDirection: 'row',
                                          marginLeft: 12,
                                          marginRight: 10,
                                      }}>
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
                                              }}>{item.location}</Text>
                                      </View>
                                      <Text
                                          onPress={() => this._onPress(item)}
                                          style={{
                                              fontSize: 20,
                                              marginTop: 5,
                                              color: '#000000',
                                              marginLeft: 15,
                                              marginRight: 25,
                                              marginBottom: 5,
                                          }}>
                                          名称：{item.name}
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
                                          下辖厂商：{item.vendor}
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
                                          物资：{item.supplies}
                                      </Text>


                                      <View style={{flex: 1, flexDirection: 'row', marginLeft: 12,}}>
                                          <Icon
                                              name='g-translate'
                                              color='#666666'
                                          />
                                          <Text
                                              style={{
                                                  fontSize: 14,
                                                  marginTop: 5,
                                                  color: '#000000',
                                                  marginLeft: 15,
                                                  marginRight: 25,
                                                  marginBottom: 5,
                                              }}>
                                              {item.audit}
                                          </Text>

                                          <View style={{flex: 1, flexDirection: 'row',}}>
                                              <Icon
                                                  name='g-translate'
                                                  color='#666666'
                                              />
                                              <Text
                                                  style={{
                                                      fontSize: 14,
                                                      marginTop: 5,
                                                      color: '#444444',
                                                      marginLeft: 15,
                                                      marginRight: 25,
                                                      marginBottom: 5,
                                                  }}>
                                                  {item.year}
                                              </Text>
                                          </View>

                                          <View style={{flex: 1, flexDirection: 'row', marginRight: 20,}}>
                                              <Icon
                                                  name='g-translate'
                                                  color='#666666'
                                              />
                                              <Text
                                                  style={{
                                                      fontSize: 14,
                                                      marginTop: 5,
                                                      color: '#444444',
                                                      marginLeft: 15,
                                                      marginRight: 25,
                                                      marginBottom: 5,
                                                  }}>
                                                  {item.phone}
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
                    <FlatList style={this.state.isActive==2? {display:'flex'}:{display:'none'}}
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
                                              }}>{item.address}</Text>
                                      </View>

                                      <Text
                                          style={{
                                              fontSize: 20,
                                              marginTop: 5,
                                              color: '#000000',
                                              marginLeft: 15,
                                              marginRight: 25,
                                              marginBottom: 5,
                                          }}>
                                          名称：{item.vendor}
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
                                          所属供应商：{item.name}
                                      </Text>

                                      <Text
                                          style={{
                                              fontSize: 14,
                                              marginTop: 5,
                                              color: '#000000',
                                              marginLeft: 15,
                                              marginRight: 40,
                                              marginBottom: 5,
                                          }}>
                                          主要物资：{item.supplies}
                                      </Text>


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
                    <FlatList style={this.state.isActive==3? {display:'flex'}:{display:'none'}}
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
                                              style={{
                                                  fontSize: 20,
                                                  marginTop: 5,
                                                  color: '#000000',
                                                  width: 360,
                                                  marginLeft: 15,
                                                  marginRight: 25,
                                                  marginBottom: 5,
                                              }}>{item.name}</Text>
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
                                          厂商：{item.vendor}
                                      </Text>

                                      <View style={{flex: 1, flexDirection: 'row', marginRight:10,}}>
                                          <Icon
                                              name='g-translate'
                                              color='#666666'
                                          />
                                          <Text
                                              style={{
                                                  fontSize: 14,
                                                  marginTop: 5,
                                                  color: '#000000',
                                                  marginLeft: 15,
                                                  marginRight: 25,
                                                  marginBottom: 5,
                                              }}>
                                              {item.price}
                                          </Text>

                                          <View style={{flex: 1, flexDirection: 'row',}}>
                                              <Icon
                                                  name='g-translate'
                                                  color='#666666'
                                              />
                                              <Text
                                                  style={{
                                                      fontSize: 14,
                                                      marginTop: 5,
                                                      color: '#444444',
                                                      marginLeft: 15,
                                                      marginRight: 25,
                                                      marginBottom: 5,
                                                  }}>
                                                  {item.number}
                                              </Text>
                                          </View>

                                          <View style={{flex: 1, flexDirection: 'row', }}>
                                              <Icon
                                                  name='g-translate'
                                                  color='#666666'
                                              />
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    active:{
        borderBottomColor:'#000000',
        borderStyle:'solid',
        borderBottomWidth:1,
    },
    tab:{
        backgroundColor:'#FFF',
        color:"#000000",
        flex: 1,
        justifyContent: 'center', alignItems: 'center',
        height:40,
        padding:10
    },
});
export default searchlistscreen;