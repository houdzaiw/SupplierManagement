import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    View,
    Dimensions,
    TextInput,Alert   } from 'react-native';
import {Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

class loginscreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            userpwd: ''
        }

    }
    loginInMainpage=function(){
        if(!this.state.username){
            Alert.alert('信息提示','用户名必须输入');
            return;
        }
        if(!this.state.userpwd){
            Alert.alert('信息提示','密码必须输入');
            return;
        }
        let url = global.config.url+'/userAPI/login';

        // let formData = new FormData();
        // formData.append("loginName",this.state.username);
        // formData.append("pwd",this.state.userpwd);
        let params={
            loginName: this.state.username,
            pwd:this.state.userpwd
        }
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        fetch(url, {
            method: 'POST',
            headers: {
               // 'Content-Type': 'application/x-www-form-urlencoded',
               // 'Accept': 'application/json',
                //'Content-Type': 'application/json',
            },
            //body: formData
        }) .then((response) => response.json())
            .then((result) => {
                if(result.doResult==1){
                     let user=JSON.parse(result.message);
                    global.config.user=user;
                    const {navigate} = this.props.navigation;
                    if (navigate) {
                        navigate('Home');
                    }
                }else{
                    Alert.alert('登录失败',result.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {

        if(global.config.user!=null){//登录过就直接跳转到首页
            const {navigate} = this.props.navigation;
            if (navigate) {
                navigate('Home');
                return;
            }
        }

        return (
            <View style={styles.container}>
                <View style={{height:100,marginBottom:0,alignItems:'center'}}>
                    <Image source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514464155025&di=744e78a103b1db453ca5b3791a7b1921&imgtype=0&src=http%3A%2F%2Fthumb106.test-ss.cn%2Fz%2Fstock-photo-284492300.jpg'}}
                           style={{width:80,height:80,}} />
                </View>
                <View style={styles.item}>
                    <Icon name="person"  color='#ccc' size={30}/>
                    <TextInput
                        ref="inputLoginName"
                        //autoFocus={true}
                        underlineColorAndroid="transparent"
                        placeholder="请输入用户名"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={styles.input}
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>
                <View style={styles.item}>
                    <Icon name="lock"  color='#ccc' size={28}/>
                    <TextInput
                        ref="inputLoginPwd"
                        underlineColorAndroid="transparent"
                        placeholder="请输入密码"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(input) => this.setState({userpwd: input})}/>
                </View>
                <TouchableHighlight style={styles.login}
                                    underlayColor='#0078FF'
                                    onPress={()=>this.loginInMainpage()}><Text
                    style={styles.loginText}>登录</Text></TouchableHighlight>
                <View style={styles.view}><Text style={styles.text}>记住密码</Text><Text style={styles.text}>忘记密码？</Text></View>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:"#fff",
    },
    item: {
        flexDirection: 'row',
        backgroundColor:"#fff",
        width:width*0.9,
        marginLeft:width*0.05,
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    login: {
        height: 50,
        backgroundColor: /*'#0084FF'*/'#517fa4',
        justifyContent: 'center',
        width:width*0.9,
        marginTop:20,
        marginLeft:width*0.05,
        borderRadius:3,
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    },
    view:{
        flexDirection:'row',
        marginTop:10,
    },
    text:{marginLeft:40,
        marginTop:10,
        marginRight:120,
        color:'red',
        fontSize:14,
    },
    input:{height: 50,
        flex:1,
        maxWidth:350,
        justifyContent: 'center',
        alignItems: 'center',
        /*borderColor: '#000000',
        borderWidth: 1,*/
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
    }
});
export default loginscreen;