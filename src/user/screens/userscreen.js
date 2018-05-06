import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';


class userscreen extends Component {
    constructor(props){
        super(props)

    }
    static navigationOptions = {
        title: '我的',
        titleStyle: {color: '#fff',},
        headerStyle:{backgroundColor:'#ccc',},
        headerLeft:<View/>,
    };

    _toUpdatePassword = () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('userupdatepassword');
        }

    };
    _toUpdateInfo= () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_info');
        }

    };


   render(){
        return(
            <View style={styles.AA}>
                <View>
                    <View style={{ flexDirection: 'row',borderColor:'#fff',
                        borderStyle:'solid',marginTop:10,height:80,backgroundColor:"#fff",marginBottom:10,
                        borderWidth:1,}}>
                        <Image style={{width:50,height:50,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.qqw21.com/article/uploadpic/2012-9/201291893228996.jpg'}}/>
                        <Text style={{marginLeft:10,marginTop:25,fontSize:20,color:"#000"}}>你好，{global.config.user.loginName}</Text>

                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={this._toUpdateInfo }>
                    <View style={styles.container}>
                        <View style={styles.text}><Icon name="create" color="#0099CC" size={20}/></View>
                        <Text  style={styles.texts}>编辑资料</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={this._toUpdatePassword}>
                    <View style={styles.container}>
                        <View style={styles.text}><Icon name="lock" color="#0099CC" size={20}/></View>
                        <Text  style={styles.texts}>修改密码</Text>
                    </View>
                    </TouchableOpacity>


                    <View style={styles.view}>
                        < Text style={styles.tc}>退出登录</Text>
                    </View>
                </View>
            </View>

        )
    }

}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        height:50,
        backgroundColor:'#fff',
        alignItems:'center',
        borderColor:'#ccc',
        borderBottomWidth:1,
    },
    container1:{
        flexDirection: 'row',
        borderColor:'#ccc',
        borderStyle:'solid',
        /*marginTop:10,*/
        height:50,
        backgroundColor:"#fff",
        borderWidth:0.5,
    },
    text:{
        marginLeft:10,
    },
    button:{
        marginLeft:10,
        fontSize:20,
    },
    view:{
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth:1,
        marginTop:200,
        height:50,
        backgroundColor:"#fff",
    },
    texts:{
        fontSize:16,
        marginLeft:10,
        color:"#000",
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

export default userscreen;