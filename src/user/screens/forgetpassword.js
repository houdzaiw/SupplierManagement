import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window')

class forgetpassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPwd:'',
            nick:'',

        }
    }

    static navigationOptions = {
        title: '我的',
        titleStyle: {color: '#000000'},
        headerStyle: {backgroundColor: '#ccc',}
    };
    forget() {
        let userInfo = global.config.user || [];
            let url = global.config.url + '/mobile/retrievePassword?password=' + this.state.newPwd + '&loginName=' + this.state.nick + '&phoneNumber=' + userInfo.phoneNumber;
            fetch(url, {
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                },

            }).then((response) => {
                let result = JSON.parse(response._bodyText);
                if (result.doResult == "1") {
                    this.props.navigation.goBack();
                    return alert('修改成功')
                } else {
                    return alert(result.message)
                }
            }).catch((error) => {
                console.error(error);
            });

        }


    render(){
        return(
            <View>
            <View style={styles.items}>
                <View style={{width:10}}></View>
                <TextInput
                    ref="inputLoginName"
                    //autoFocus={true}
                    underlineColorAndroid="transparent"
                    placeholder="请输入手机号码"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={styles.input}
                    //autoCapitalize = 'none'
                    onChangeText={(input) => this.setState({username: input})}
                />
                <TouchableOpacity>
                <View style={{width:90,height:50,backgroundColor:'#fff',marginLeft:140}}>
                    <Text style={{marginTop:20,marginLeft:10}}>获取验证码</Text>
                </View>
                </TouchableOpacity>
            </View>

                <View style={styles.item}>
                    <View style={{width:10}}></View>
                    <TextInput
                        ref="inputLoginName"
                        //autoFocus={true}
                        underlineColorAndroid="transparent"
                        placeholder="请输入验证码"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={styles.input}
                        //autoCapitalize = 'none'
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>

                <View style={styles.item}>
                    <View style={{width:10}}></View>
                    <TextInput
                        ref="inputLoginName"
                        //autoFocus={true}
                        underlineColorAndroid="transparent"
                        placeholder="请输入新密码"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={styles.input}
                        //autoCapitalize = 'none'
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>

                <TouchableHighlight style={styles.login}
                                    underlayColor='#0078FF'
                                    onPress={()=>this.forget()}><Text
                    style={styles.loginText}>提交</Text></TouchableHighlight>
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

    item: {
        flexDirection: 'row',
        backgroundColor:"#fff",
        width:width*0.9,
        marginLeft:width*0.05,
        height:50,
        marginTop:10,
    },

    items: {
        flexDirection: 'row',
        backgroundColor:"#fff",
        width:width*0.6,
        marginLeft:width*0.05,
        height:50,
        marginTop:10,
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
});
export default forgetpassword;