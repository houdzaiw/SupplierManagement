import React, { Component } from 'react';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import {Icon} from 'react-native-elements'
import ImageMagify from '../../component/ImageMagnify';
import ImageShow from '../../component/ImageShow';
let Dimensions = require('Dimensions');
let ScreenWidth = Dimensions.get('window').width;

class companydetailscreen extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            limit: 1,
            error: null,
            refreshing: false,
            showPop:false,
            isActive:1,
            imgUrl:[],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const {limit} = this.state;
        const { params } = this.props.navigation.state;
        const url = global.config.url+'/mobile/loadScs?id='+params.data+'&userId='+global.config.user.id+'&yyid='+global.config.user.yyid;
        console.log('url -----',url)
        this.setState({loading: true});

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log('response -----',response)
                this.setState({
                    data: response.data,
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
    renderLoadingView()
    {
        return (
            <View style={styles.containers}>
                <Text>
                    正在加载数据......
                </Text>
            </View>
        );
    }




    renderView(){
        let data = this.state.data || {}
        let file = data.file || [];
        let htFile = data.htFile || [];
        let cInfo = data.cInfo || [];
        let info = data.info || [];

        return(
            <View style={{flex:1}}>
                <ScrollableTabView
                    style={styles.container}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#FDA313'>

                    <View style={[styles.textStyle,]} tabLabel='基本信息'>
                        {/*物资页面*/}
                        <ScrollView style={{backgroundColor:'#fff'}}>
                            <View style={{
                                marginBottom: 8, flexDirection: 'column',marginTop:3,marginRight:10
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        marginTop: 8,
                                        color: '#000000',
                                        marginLeft: 15,
                                        marginRight: 25,
                                        marginBottom: 8,
                                    }}>基本信息: </Text>
                                <View style={{height:0.5,backgroundColor:'#ccc',width:500}}/>
                                <Text style={styles.text4}>厂商名称：{info.manufacturerName || ''}</Text>
                                <Text style={styles.text4}>厂商简称:{data.info.manufacturerAbbreviation || ''}</Text>
                                <Text style={styles.text4}>供应商:{data.info.scsdm || ''}</Text>
                                <Text style={styles.text4}>开户行：{data.info.openingBank || ''}</Text>
                                <Text style={styles.text4}>开户账号:{data.info.bankAccountNumber || ''}</Text>
                                <Text style={styles.text4}>主营产品:{data.info.mainProducts || ''}</Text>
                                <Text style={styles.text4}>经营模式:{data.info.managementModel || ''}</Text>



                                <View style={{backgroundColor:"#ccc",height:5,width:500}}></View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        marginTop: 8,
                                        color: '#000000',
                                        marginLeft: 15,
                                        marginRight: 25,
                                        marginBottom: 8,
                                    }}>通讯信息: </Text>
                                <View style={{height:1,backgroundColor:'#ccc',width:500}}/>
                                <Text style={styles.text4}>所属地区：{data.cInfo.regionCode || ''}</Text>
                                <Text style={styles.text4}>邮政编码:{data.cInfo.postalCode || ''}</Text>
                                <Text style={styles.text4}>QQ号码:{data.cInfo.qqNumber || ''}</Text>
                                <Text style={styles.text4}>传真号码:{data.cInfo.fax || ''}</Text>
                                <Text style={styles.text4}>电子邮箱:{data.cInfo.mailBox || ''}</Text>
                                <Text style={styles.text4}>详细地址:{data.cInfo.address || ''}</Text>


                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.textStyle} tabLabel='资质证书'>
                        {/*工具页面*/}
                        <ScrollView style={{backgroundColor:"#FFF"}}>

                            <Text
                                style={{
                                    fontSize: 16,
                                    marginTop: 8,
                                    color: '#000000',
                                    marginLeft: 15,
                                    marginRight: 25,
                                    marginBottom: 8,
                                }}>各级经营代理企业资格证书: </Text>
                            <View style={{height:1,backgroundColor:'#ccc',width:500}}/>
                            {data.file.map((itemc, i) =>
                                <View >
                                    <Text style={{marginLeft:10,marginTop:10}}>{itemc.qualificationsInfoTypeName}</Text>
                                    <View style={{marginLeft:10,height:150,}}>
                                        <TouchableOpacity onPress={()=>{
                                            this.setState({
                                                imgUrl:itemc.imgs,
                                            })
                                            this.imageShow&&this.imageShow.isOpenModel();
                                        }}>
                                            <Image source={{uri: global.config.urlimg+itemc.imgs[0]}}
                                                   style={styles.img} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.view}>
                                        <Text style={{flex:1}}>有效期开始:{itemc.validityStartDate}</Text>
                                        <Text style={{flex:1}}>有效期结束:{itemc.validityEndDate}</Text>
                                    </View>
                                    <View style={styles.view}>
                                        <Text style={{flex:1}}>审核意见:{itemc.shyj}</Text>
                                        <Text style={{flex:1}}>状态:{itemc.shzt}</Text>
                                    </View>
                                    <View style={styles.view}>
                                        <Text>备注:{itemc.remarks}</Text>
                                    </View>
                                    <View
                                        style={{
                                            height: 1,
                                            width: "100%",
                                            backgroundColor: "#cccccc",
                                            marginTop:15,
                                        }}
                                    />
                                </View>

                            )
                            }
                        </ScrollView>
                    </View>


                    <View style={styles.textStyle} tabLabel='审核状态'>
                        {/*工具页面*/}

                        <View style={{backgroundColor:"#FFF",height:150}}>
                            <View style={{height:75, flexDirection: 'row',marginLeft:10}}>
                                <Icon
                                    name='g-translate'
                                    color='#FDA313'
                                    size={40}
                                />
                                <Text style={{marginLeft:10,marginTop:30}}>审核状态：{info.shztName || ''}</Text>
                            </View>
                            <View style={{height:1,backgroundColor:'#ccc',width:500}}/>

                            <View style={{height:75, flexDirection: 'row',marginLeft:10}}>
                                <Icon
                                    name='map'
                                    color='#FDA313'
                                    size={40}
                                />
                                <Text style={{marginLeft:10,marginTop:30}}>审核意见：{info.shyj || ''}</Text>
                            </View>
                        </View>

                    </View>
                </ScrollableTabView>
                {this.state.imgUrl.length !== 0 && <ImageShow ref = {(e) => this.imageShow = e}
                                                              imgUrl = {this.state.imgUrl}/>}
                {/*<ImageShow imgUrl = {this.state.imgUrl} refs = {(e) => this.imageShow = e}/>*/}
            </View>

        )
    }


    render() {
        //const { params } = this.props.navigation.state;
        //alert(params.data)
        // console.log ("99999999999："+params.user);
        if (!this.state.data.info) {
            return this.renderLoadingView();
        }
        return this.renderView();

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    lineStyle: {
        width:ScreenWidth/3,
        height: 2,
        backgroundColor: '#FDA313',
    },
    textStyle: {
        flex: 1,
    },
    view:{
        flexDirection: 'row',
        marginLeft:10,
        padding:2,
        marginTop:10
    },
    text:{
        marginRight:40,
    },
    img:{
        maxWidth: 200,
        height: 130,
        justifyContent: 'center',
        marginLeft:100,
        marginRight:100,
        marginTop:10,
    },

    containers:{
        flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#F5FCFF',borderBottomColor:"#000",
        borderBottomWidth:1,borderStyle:'solid',
    },

    text4:{
        fontSize: 14,
        marginTop: 5,
        color: '#666666',
        marginLeft: 15,
        marginRight: 25,
        marginBottom: 5,
    },

});
export default companydetailscreen;