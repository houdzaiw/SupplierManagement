import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
    TextInput,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';
// import Toast from 'react-native-toast';


class nicknamescreen extends Component {
    constructor(props){
        super(props)
        this.state={
            nick:'',
        }
        _this = null;
    }
    componentDidMount() {
        _this = this;
    }
    static navigationOptions = {

        title: '更改昵称',
        titleStyle: {color: '#000000',},
        headerStyle:{backgroundColor:'#000000',},
        headerRight:(
            <Text style={{right:10}} onPress={()=>{
                _this.fetchWork();
            }}>
                提交
            </Text>
        )
    };
    fetchWork(){
        let userInfo = global.config.user || [];

        if(this.state.nick.length === 0){
            return Alert.alert('输入昵称不能为空')
        }
        let url = global.config.url+'/mobile/modifyUserName?zjid='+userInfo.zjid+'&loginName='+this.state.nick+'&phoneNumber='+userInfo.phoneNumber;
        fetch(url, {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
            },

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

    render(){
        return(
            <View style={{marginTop:3,}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={{height: 40,maxWidth:350, borderColor: 'green', borderWidth: 1,marginLeft:20,}}
                    onChangeText={(text) => this.setState({nick:text})}
                />
                <Text style={{marginLeft:30,marginTop:10,fontSize:16}}>请在此处修改你的昵称！</Text>

            </View>
        )
    }
}



export default nicknamescreen;