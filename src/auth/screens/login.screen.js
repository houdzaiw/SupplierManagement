import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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

    _toForget= () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('forget');
        }

    };

    // componentWillMount(){
    //     let toke = nil;
    //     if (toke.length !== 0){
    //         const {navigate} = this.props.navigation;
    //         if (navigate) {
    //             navigate('Supplier');
    //         }
    //     }else {
    //
    //     }
    //
    // }

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

         //let formData = new FormData();
         //formData.append("loginName",this.state.username);
         //formData.append("pwd",this.state.userpwd);
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
            // headers: {
            //     'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            //     'Content-Type' : 'text/plain;charset=UTF-8',
            //     'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
            //     'Host' : 'domain.xx.com',
            // },
           //body: JSON.stringify(formData)
        }) .then((response) => response.json())
            .then((result) => {
                if(result.doResult==1){
                    let user=JSON.parse(result.message);
                     if(user.yhlx=='2'){
                         this.loginSuccess(user);

                     }else{
                         Alert.alert('登录失败',result.message);
                     }


                }else{
                    Alert.alert('登录失败',result.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    loginSuccess(user){//登录函数
        // debugger;
        // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        console.log("user ----",user);
        storage.save({
            key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
            data: user,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            // 8个小时后过期
            expires: 1000 * 3600 * 8
        });
        global.user.loginState = true;//设置登录状态
        global.user.userData = user;//保存用户数据

        setTimeout(()=>{
            this.props.navigation.navigate('Supplier')//跳转到用户页面
        },2000)

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
                        //autoCapitalize = 'none'
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
                <View style={styles.view}><Text style={styles.text}>记住密码</Text>
                    <TouchableOpacity onPress={this._toForget}><Text style={styles.text}>忘记密码？</Text></TouchableOpacity></View>
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