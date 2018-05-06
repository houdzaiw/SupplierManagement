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
    fetchData (){
        const {limit} = this.state;
        const { params } = this.props.navigation.state;
        const url = global.config.url+'/mobile/chart?ddh='+params.data+'&yyid=53010301';
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
                    <Text style={styles.date}>{item.cjsj}</Text>
                    <View style={styles.date1}>
                        <Text style={styles.date2}>{item.ddztName}</Text>
                    </View>
                    </View>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc',marginLeft:10,}}/>
            </View>
        );

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