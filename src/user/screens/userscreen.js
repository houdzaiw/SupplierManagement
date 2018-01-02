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
        headerStyle:{backgroundColor:'#ccc',}
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
    /*_toUpdateDd = () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_dd');
        }

    };*/

   render(){
        return(
            <View style={styles.AA}>
                <View>
                    <View style={{ flexDirection: 'row',borderColor:'#fff',
                        borderStyle:'solid',marginTop:10,height:80,backgroundColor:"#fff",
                        borderWidth:1,}}>
                        <Image style={{width:50,height:50,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.qqw21.com/article/uploadpic/2012-9/201291893228996.jpg'}}/>
                        <Text style={{marginLeft:10,marginTop:25,fontSize:20,color:"#000"}}>你好，明天</Text>

                    </View>
                    <View style={styles.container}>
                        <View style={styles.text}><Icon name="create" color="#0099CC" size={20}/></View>
                        <Text onPress={this._toUpdateInfo} style={styles.texts}>编辑资料</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.text}><Icon name="lock" color="#0099CC" size={20}/></View>
                        <Text onPress={this._toUpdatePassword} style={styles.texts}>修改密码</Text>
                    </View>

                    <View style={styles.view}>
                        < Text style={styles.tc}>退出登录</Text>
                    </View>
                </View>
            </View>

           /*<View style={styles.AA}>
            <View>
                <View style={{ flexDirection: 'row',borderColor:'#fff',marginBottom:0,
                    borderStyle:'solid',marginTop:10,height:80,backgroundColor:"#fff",
                    borderWidth:1,}}>
                    <Image style={{width:50,height:50,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.qqw21.com/article/uploadpic/2012-9/201291893228996.jpg'}}/>
                    <Text style={{marginLeft:10,marginTop:25,fontSize:20,color:"#000"}}>你好，明天</Text>
                </View>

                <View style={{ flexDirection: 'row',borderColor:'#ccc',
                    borderStyle:'solid',marginTop:10,height:50,backgroundColor:"#fff",
                    borderWidth:1,}}>
                    <Icon style={{width:50,height:50,marginLeft:10,marginTop:13,}} name="create" color="#0099CC" size={20}/>
                    <TouchableOpacity onPress={this._toUpdateInfo}>
                    <Text style={{marginLeft:0,marginTop:15,fontSize:18,color:"#000"}}>编辑资料</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',borderColor:'#ccc',
                    borderStyle:'solid',height:50,backgroundColor:"#fff",
                    borderWidth:1,}}>
                    <Icon style={{width:50,height:50,marginLeft:10,marginTop:13,}} name="lock" color="#0099CC" size={20}/>
                    <TouchableOpacity onPress={this._toUpdatePassword}>
                    <Text style={{marginLeft:0,marginTop:15,fontSize:18,color:"#000"}}>修改密码</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row',borderColor:'#ccc',
                    borderStyle:'solid',height:50,backgroundColor:"#fff",marginTop:200,
                    borderWidth:1,}}>
                    <TouchableOpacity>
                        <Text style={{marginLeft:150,marginTop:15,fontSize:18,color:"#000",
                            textAlign:'center',}}>退出登录</Text>
                    </TouchableOpacity>
                </View>

            </View>
           </View>*/
        )
    }

}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        height:50,
        backgroundColor:'#fff',
        marginTop:10,
        alignItems:'center'
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
        marginTop:210,
        height:50,
        backgroundColor:"#fff",
    },
    texts:{
        fontSize:18,
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