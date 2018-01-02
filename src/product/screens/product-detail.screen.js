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


class productdetailscreen extends Component {
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
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const {limit} = this.state;
        const { params } = this.props.navigation.state;
        const url = 'http://localhost:8080/yywl-gyswl/mobile/loadCp?id='+params.data+'&userId='+global.config.user.id+'&yyid='+global.config.user.yyid;
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
            <View>
                <View>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <TouchableHighlight onPress={() => this.setState({isActive:1})}>
                        <View style={[this.state.isActive==1? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>基本信息</Text>
                        </View>
                    </TouchableHighlight>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <View style={[this.state.isActive==1? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={{marginLeft:10,}}>{data.info.materialName}</Text>
                        <View style={{marginLeft:10,}}><Text>规格:{data.info.specifications}</Text></View>
                        <View style={{marginLeft:10,}}><Text>生产厂家:{data.info.manufacturerTypeCode}</Text></View>
                        <View style={styles.view}>
                            <Text style={styles.text}>型号:{data.info.model}</Text>
                            <Text>类别:{data.info.productTypeCode}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>单价:{data.info.unitPrice}</Text>
                            <Text>单位:{data.info.companyTypeCode}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>包装量:{data.info.packingCapacity}</Text>
                            <Text>包装单位:{data.info.packingUnit}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>包装{data.info.packing}</Text>
                            <Text>是否启用:{data.info.manufacturerName}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>是否公开发布:{data.info.publicRelease}</Text>
                            <Text>产地:{data.info.producingArea}</Text>
                        </View>

                        <View style={styles.view}>
                            <Text style={styles.text}>来源:{data.info.sourceTypeCode}</Text>
                            <Text>通用名:{data.info.genericName}x</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.text}>品牌:{data.info.brand}</Text>
                            <Text>68码2：{data.info.t68code2Code}</Text>
                        </View>

                        <View style={{marginLeft:10,}}><Text>产品条码:{data.info.productBarcode}</Text></View>
                        <View style={{marginLeft:10,}}><Text>医保号:{data.info.middleLabel}</Text></View>
                        <View style={{marginLeft:10,}}><Text>注册证号:{data.info.zczh}</Text></View>
                        <View style={{marginLeft:10,}}><Text>备注:{data.info.remarks}</Text></View>
                    </View>
                </View>


                <View>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <TouchableHighlight onPress={() => this.setState({isActive:1})}>
                        <View style={[this.state.isActive==1? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>资质证书</Text>
                        </View>
                    </TouchableHighlight>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    {data.file.map((itemc, i) =>
                    <View style={[this.state.isActive==1? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={{marginLeft:10,}}>{itemc.qualificationsInfoTypeCode}</Text>
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
                    )
                    }
                </View>


                <View>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <TouchableHighlight onPress={() => this.setState({isActive:1})}>
                        <View style={[this.state.isActive==1? styles.active:null,styles.item]}>
                            <Text style={styles.text1}>审核</Text>
                        </View>
                    </TouchableHighlight>
                    {/*//中间划线*/}
                    <View style={{height:0.5,backgroundColor:'#ccc'}}/>
                    <View style={[this.state.isActive==1? {display:'flex'}:{display:'none'},styles.content]}>
                        <Text style={{marginLeft:10,}}>审核状态：{data.info.manufacturerName}</Text>
                        <View style={{marginLeft:10,}}>
                            <Text>审核意见:{data.info.shyj}</Text>
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
        borderWidth:0.5,//改了边框宽度0.5改为1*/
        padding:5
    },
    content:{
        padding:10,backgroundColor:'#FFF'
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
        fontWeight:"100"
        /*borderColor:'#000000',
        borderStyle:'solid',
        borderWidth:1,*/
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
export default productdetailscreen;


