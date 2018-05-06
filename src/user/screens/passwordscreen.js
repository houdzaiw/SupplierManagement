import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';


class passwordscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPwd:'',
            newPwd:'',
            confirmPwd:'',
        }
    }

    static navigationOptions = {
        title: '我的',
        titleStyle: {color: '#000000'},
        headerStyle: {backgroundColor: '#ccc',}
    };
    changePassword(){

        let userInfo = global.config.user || [];
        console.log('userInfo ----',userInfo);

        if(!this.state.oldPwd.length){
            return alert('请输入旧密码')
        }else if(!this.state.newPwd.length){
            return alert('请输入新密码')
        }else if(!this.state.confirmPwd.length){
            return alert('请输入确认密码')
        }else if(this.state.newPwd !== this.state.confirmPwd) {
            return alert('输入的新密码不一致')
        }else {
            let url = global.config.url+'/mobile/modifyPassword?ysmm='+this.state.oldPwd+'&password='+this.state.confirmPwd+'&zjid='+userInfo.zjid;
            fetch(url, {
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                }
            }) .then((response) => {
                let result=JSON.parse(response._bodyText);
                if(result.doResult=="1"){
                    this.props.navigation.goBack();
                    return alert('修改成功')
                }else {
                    return alert(result.message)
                }

            }).catch((error) => {
                console.error(error);
            });
        }
    }
    render(){
        return(
            <View style={styles.AA}>
                <View style={styles.rowStyle}>
                    <Text style={{marginLeft:10,marginRight:10,fontSize:16,color:"#000"}}>原密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输入原来的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250, backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({oldPwd: input})}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Text style={{marginLeft:10,marginRight:10,fontSize:16,color:"#000"}}>新密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输新设置的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250, backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({newPwd: input})}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Text style={{marginLeft:10,marginRight:10,fontSize:16,color:"#000"}}>确认密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请再次输入新设置的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250,backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({confirmPwd: input})}
                    />
                </View>
                <TouchableHighlight style={{borderColor:'#CCC', borderStyle:'solid',
                    marginTop:10,height:50,backgroundColor:"#FFF", borderWidth:1,}}
                                    underlayColor='#0078FF'
                                    onPress={()=>this.changePassword()}><Text
                    style={{textAlign:'center',marginTop:10, justifyContent: 'center',color:"#000000",fontSize:22,}}>
                    确认修改</Text></TouchableHighlight>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    AA:{
        flex: 1,
        backgroundColor: '#EFEFEF',

    },
    rowStyle:{
        flexDirection: 'row',
        borderColor:'#cccccc',
        borderStyle:'solid',
        marginTop:10,
        height:50,
        backgroundColor:"#FFF",
        borderWidth:1,
        alignItems:'center'
    },
});
export default passwordscreen;