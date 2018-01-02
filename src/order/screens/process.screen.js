import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';


class processscreen extends Component {


    /*render(){
        return(
            <View style={styles.AA}>
                <View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View style={{borderColor:"red",}}>
                            <Text style={styles.date}>2017-12-4  12:40:17</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>订单创建人:小明</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>2017-12-5  12:40:12</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>订单状态:待审核</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>2017-12-6  14:15:10</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>订单状态：已审核</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>2017-12-4  12:40</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>订单创建人:小明</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>2017-12-4  12:40</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>订单创建人:小明</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }*/

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




    renderRow(rowData){
        console.log('rowdataspecifications-----',rowData.item);
        let time = ''
        let item = rowData.item || {};
        return(
            <View  style={{flex:1,height:80,backgroundColor:'#fff'}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View>
                        <View style={styles.view1}></View>
                        <View style={styles.view2}></View>
                        <View style={styles.view3}></View>
                    </View>
                    <View style={{borderColor:"red",}}>
                    <Text style={styles.date}>{/*item.price*/}2017-12-4 12:40:07</Text>
                    <View style={styles.date1}>
                        <Text style={styles.date2}>{/*item.price*/}创建人：小红</Text>
                    </View>
                    </View>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc',marginLeft:10,}}/>
            </View>
        );


        return1111(
            <View style={styles.AA}>
                <View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View style={{borderColor:"red",}}>
                            <Text style={styles.date}>{item.price}</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>{item.price}</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={styles.view2}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>{item.price}</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>{item.price}</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>{item.price}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.test}>
                        <View>
                            <View style={styles.view1}></View>
                            <View style={{backgroundColor:"#1ED296",
                                borderColor:'#ccc',
                                height:11,
                                width:11,
                                borderStyle:'solid',
                                borderWidth:0.5,
                                borderRadius: 50,
                                marginLeft:6,}}></View>
                            <View style={styles.view3}></View>
                        </View>
                        <View>
                            <Text style={styles.date}>{item.price}</Text>
                            <View style={styles.date1}>
                                <Text style={styles.date2}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        return(
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={(rowData) => this.renderRow(rowData)}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    test:{
        flexDirection: 'row',
        borderColor:'#ccc',
        borderStyle:'solid',
        height:90,
        backgroundColor:"#fff",
        borderWidth:0.5,//改了边框宽度0.5改为1
    },
    view1:{
        backgroundColor:"#ccc",
        height:30,
        width:4,
        marginLeft:10,
    },
    view2:{
        backgroundColor:"#FDA313",
        borderColor:'#ccc',
        height:11,
        width:11,
        borderStyle:'solid',
        borderWidth:0.5,
        borderRadius: 50,
        marginLeft:6,
    },
    view3:{
        backgroundColor:"#ccc",
        height:46,
        width:4,
        marginLeft:10,
        marginTop:2,
    },
    date:{
        marginLeft:20,
        marginTop:5,
        fontSize:16,
        color:"red",
    },
    date1:{
        backgroundColor: '#F8F8F8',
        width:330,
        height:40,
        marginLeft:20,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderWidth:0.5,
        borderRadius: 5,
    },
    date2:{
        marginTop:10,
        fontSize:16,
        color:"#000",
        marginLeft:20,
    },
});

export default processscreen;