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

    }

    static navigationOptions = {
        title: '我的',
        titleStyle: {color: '#000000'},
        headerStyle: {backgroundColor: '#ccc',}
    };

    render(){
        return(
            <View style={styles.AA}>
            <View>
                <View style={{ flexDirection: 'row',borderColor:'#cccccc',
                    borderStyle:'solid',marginTop:10,height:50,backgroundColor:"#FFF",
                    borderWidth:1,}}>
                    <Text style={{marginLeft:10,marginRight:10,marginTop:10,fontSize:16,color:"#000"}}>原密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输入原来的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250, marginTop:7,backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>
                <View style={{ flexDirection: 'row',borderColor:'#cccccc',
                    borderStyle:'solid',marginTop:10,height:50,backgroundColor:"#FFF",
                    borderWidth:1,}}>
                    <Text style={{marginLeft:10,marginRight:10,marginTop:10,fontSize:16,color:"#000"}}>新密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请输新设置的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250, marginTop:7,backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>
                <View style={{ flexDirection: 'row',borderColor:'#cccccc',
                    borderStyle:'solid',marginTop:10,height:50,backgroundColor:"#FFF",
                    borderWidth:1,}}>
                    <Text style={{marginLeft:10,marginRight:10,marginTop:10,fontSize:16,color:"#000"}}>确认密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="请再次输入新设置的登录密码"
                        style={{height: 36, borderRadius: 5,flexDirection: 'row',flex:1,
                            borderColor:'#FFF',maxWidth:250, marginTop:7,backgroundColor:"#FFF",
                        }}
                        onChangeText={(input) => this.setState({username: input})}
                    />
                </View>
                <TouchableHighlight style={{borderColor:'#CCC', borderStyle:'solid',
                    marginTop:10,height:50,backgroundColor:"#FFF", borderWidth:1,}}
                                    underlayColor='#0078FF'
                                    onPress={()=>this.login()}><Text
                    style={{textAlign:'center',marginTop:10, justifyContent: 'center',color:"#000000",fontSize:22,}}>
                    确认修改</Text></TouchableHighlight>
            </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    AA:{
        flex: 1,
        backgroundColor: '#EFEFEF',

    },
});
export default passwordscreen;