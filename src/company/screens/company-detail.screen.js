import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableHighlight,
    StyleSheet,
    Image,
    FlatList,
    Alert
} from 'react-native'
import {Icon} from 'react-native-elements'


class companydetailscreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            limit: 1,
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
        const { params } = this.props.navigation.state;
        const url = 'http://localhost:8080/yywl-gyswl/mobile/loadScs?id='+params.data+'&userId='+global.config.user.id+'&yyid='+global.config.user.yyid;
        this.setState({loading: true});

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
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

    /*componentDidMount() {
        ///const {navigate} = this.props.navigation;
        // let data=navigation.state.params.data //key就是你自己设置的键
    }*/



    renderLoadingView()
    {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载数据......
                </Text>
            </View>
        );
    }
    renderView(data) {
        return (
            <ScrollView>
            <View style={styles.rootview}>
                <View>
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <TouchableHighlight onPress={() => this.setState({isActive:1})}>
                        <View style={[this.state.isActive==1? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>基本信息</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <View style={[this.state.isActive==1? {display:'flex'}:{display:'none'},styles.content]}>
                        <View style={styles.view}><Text>厂商名称：{data.info.manufacturerName}</Text></View>
                        <View style={styles.view}><Text>厂商简称:{data.info.manufacturerAbbreviation}</Text></View>
                        <View style={styles.view}><Text>供应商:{data.info.scsdm}</Text></View>
                        <View style={styles.view}><Text>开户行：{data.info.openingBank}</Text></View>
                        <View style={styles.view}><Text>开户账号:{data.info.bankAccountNumber}</Text></View>
                        <View style={styles.view}><Text>主营产品:{data.info.mainProducts}</Text></View>
                        <View style={styles.view}><Text>经营模式:{data.info.managementModel}</Text></View>
                    </View>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this.setState({isActive:2})}>
                        <View style={[this.state.isActive==2? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>通讯信息</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <View style={[this.state.isActive==2? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={styles.view}>所属地区：{data.cInfo.regionCode}</Text>
                        <View style={styles.view}>
                            <Text>邮政编码:{data.cInfo.postalCode}</Text>
                        </View>
                        <View style={styles.view}><Text>QQ号码:{data.cInfo.qqNumber}</Text></View>
                        <View style={styles.view}><Text>传真号码:{data.cInfo.fax}</Text></View>
                        <View style={styles.view}><Text>电子邮箱:{data.cInfo.mailBox}</Text></View>
                        <View style={styles.view}><Text>详细地址:{data.cInfo.address}</Text></View>
                    </View>
                </View>


                <View>
                    <TouchableHighlight onPress={() => this.setState({isActive:3})}>
                        <View style={[this.state.isActive==3? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>各级经营代理企业资质证书</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    {data.file.map((itemc, i) =>
                    <View style={[this.state.isActive==3? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={styles.view}>{itemc.qualificationsInfoTypeName}</Text>
                        <View style={{marginLeft:10,height:150,}}>
                            <Image source={{uri: 'http://img1.jc001.cn/img/695/907695/1182566592775.jpg'}}
                                   style={styles.img} />
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>有效期开始:{itemc.validityStartDate}</Text>
                            <Text>有效期结束:{itemc.validityEndDate}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>审核意见:{itemc.shyj}</Text>
                            <Text>状态:{itemc.shzt}</Text>
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
                    )}
                </View>


                <View>
                    <TouchableHighlight onPress={() => this.setState({isActive:5})}>
                        <View style={[this.state.isActive==5? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>审核</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <View style={[this.state.isActive==5? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={styles.view}>审核状态：审核通过</Text>
                        <View style={styles.view}>
                            <Text>审核意见:批量审批通过</Text>
                        </View>
                    </View>
                </View>
            </View>

            </ScrollView>
        );
    }
    render() {
        if (!this.state.data.info) {
            return this.renderLoadingView();
        }
        var info = this.state.data;
        return this.renderView(info);
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#F5FCFF'
    },
    active:{
        backgroundColor:'#41C7DB',
        color:"#000",
    },
    item:{
        /*borderColor:'#ccc',
        borderStyle:'solid',
        borderWidth:1,//改了边框宽度0.5改为1*/
        padding:5
    },
    content:{
        padding:10,
        backgroundColor:'#FFF'
    },
    rootview:{
        //flexDirection: 'row',
        //height: 50,
        backgroundColor: '#FFF',
    },

    view:{
        flexDirection: 'row',
        marginLeft:10,
        padding:2
    },
    text:{
        marginRight:50,
    },
    text1:{
        fontSize:15,
        color:"#111",
        marginLeft:5,
        fontWeight:"100",
        /*borderColor:'#000000',
        borderStyle:'solid',
        borderWidth:0.5,*/
    },
    img:{
        maxWidth: 200,
        height: 130,
        textAlign:'center',
        justifyContent: 'center',
        marginLeft:100,
        marginRight:100,
        marginTop:10,
    },

});
export default companydetailscreen;