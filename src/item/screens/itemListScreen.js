import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    View,
} from 'react-native'

class itemListScreen extends Component {
    constructor(props){
        super(props)

    }
    static navigationOptions = {
        title: '厂商',
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'red'}
    };
    render(){
        return(
            <View style = {{backgroundColor:'cyan',flex:1}}>
                <View><Text>你好，明天</Text></View>
            </View>
        )
    }
}
export default itemListScreen;