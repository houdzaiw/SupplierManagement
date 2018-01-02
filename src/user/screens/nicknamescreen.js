import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Button,
    TextInput,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';


class nicknamescreen extends Component {
    constructor(props){
        super(props)

    }
    static navigationOptions = {
        title: '更改昵称',
        titleStyle: {color: '#000000',},
        headerStyle:{backgroundColor:'#000000',}
    };


    render(){
        return(
            <View style={{marginTop:3,}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={{height: 40,maxWidth:350, borderColor: 'green', borderWidth: 1,marginLeft:20,}}
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{marginLeft:30,marginTop:10,fontSize:16}}>请在此处修改你的昵称！</Text>

            </View>
        )
    }
}



export default nicknamescreen;