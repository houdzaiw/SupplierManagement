import React,{ Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    Button,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';


class goodsscreen extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Image style={{maxWidth:400,height:300,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>
                <View style={{height:50,paddingHorizontal:10,}}>
                <Text style={{marginTop:20,fontSize:16}}>金属锁定接骨板</Text>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc'}}/>
                <View style={{height:50,paddingHorizontal:10,}}>
                    <Text style={{marginTop:20,fontSize:16}}>规格：直型锁定接骨板 | 684601-植入器材</Text>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc'}}/>
                <View style={{height:50,paddingHorizontal:10,}}>
                    <Text style={{marginTop:20,fontSize:16}}>厂商：北京市富乐科技开发有限公司</Text>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc'}}/>
                <View style={{height:50,paddingHorizontal:10,}}>
                    <Text style={{marginTop:20,fontSize:16,color:"red",}}>￥1000</Text>
                </View>
                {/*//中间划线*/}
                <View style={{height:1,backgroundColor:'#ccc'}}/>
            </View>



            /*<View style={styles.AA}>
                <View>
                    <View style={{ borderColor:'#fff',marginBottom:10,maxWidth:400,height:300,
                        borderStyle:'solid',marginTop:10,backgroundColor:"#fff",
                        borderWidth:0.5,}}>
                        <Image style={{maxWidth:400,height:300,marginLeft:10,marginTop:13,marginRight:10,}} source={{uri: 'http://www.ylsw.net/images/uploadImages/53135/20100726105912812894.jpg'}}/>

                    </View>
                    <View style={styles.container}>
                        <Text style={styles.texts}>金属锁定接骨板</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize:16,
                            marginLeft:10,
                            marginTop:10,
                            color:"#000",
                        }}>规格：直型锁定接骨板 | 684601-植入器材</Text>
                    </View>
                    <View style={styles.container}>
                        <Text  style={{fontSize:16,
                            marginLeft:10,
                            marginTop:10,
                            color:"#000",
                        }}>厂商：北京市富乐科技开发有限公司</Text>
                    </View>
                    <View style={styles.container}>
                        <Text  style={{fontSize:16,
                            marginLeft:10,
                            marginTop:10,
                            color:"red",
                        }}>价格：￥1000</Text>
                    </View>
                </View>
            </View>*/
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor:'#ccc',
        borderStyle:'solid',
        /*marginTop:10,*/
        height:50,
        backgroundColor:"#fff",
        borderWidth:0.5,//改了边框宽度0.5改为1
    },
    text:{
        marginLeft:10,
        marginTop:10,
    },
    button:{
        marginLeft:10,
        marginTop:10,
        fontSize:20,
    },
    view:{
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth:0.5,
        marginTop:210,
        height:50,
        backgroundColor:"#fff",
    },
    texts:{
        fontSize:18,
        marginLeft:10,
        marginTop:10,
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

export default goodsscreen;