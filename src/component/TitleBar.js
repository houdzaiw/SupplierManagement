import React,{Component} from "react";
import {Text, View, Linking,StyleSheet,TextInput,TouchableOpacity,Dimensions,Alert} from "react-native";
import {Card, Icon,Button,SearchBar} from 'react-native-elements';
const {width, height} = Dimensions.get('window')

class TitleBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            show:false,
            value:null,
            keyboardInput:'',
        }
    }
    _ToSearchList() {
        if(!this.state.keyword){
            Alert.alert('温馨提醒','搜索关键字不能为空');
            return;
        }
        let me=this;
        MySorage._load("keyword",function(data){
            Alert.alert('温馨提醒','111');
            console.info(data);
            if(!data){
                data=[];
            }
            data.push({name:me.state.keyword});
            MySorage._sava("keyword",data);
            let {navigate} = me.props.navigation;
            if (navigate) {
                navigate('search_list');
            }
        });
    }
    renderList(list) {
        return list.map(item => this.renderItem(item));
    }


    render() {
        return (
            /*<View style={styles.rootview}>
                <TouchableOpacity onPress={() => this.props.leftClick()} style={styles.left} >
                <View  style={styles.left}>
                    <Icon  name="search" size={20}/>
                    <Text style={{flexDirection:'row',flex:1}}>{this.props.content}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.right} onPress={() => this.props.rightClick()}>
                <View style={styles.right}>
                    <Icon name="reorder"/>
                    <Text>快速筛选</Text>
                </View>
                </TouchableOpacity>
            </View>*/


            <View style={{ flexDirection: 'row',marginLeft:10,backgroundColor:'#fff',padding:10, justifyContent: 'center', alignItems: 'center',maxWidth:350,}}>
                <View style={{width:300,flexDirection: 'row',backgroundColor:"#ccc",paddingLeft:5,}}>
                    <Icon  name="search" size={20}/>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="请输入搜索内容"
                    style={{height: 36,width:250, backgroundColor:'#ccc', borderRadius: 5,flexDirection: 'row',flex:1}}
                    onChangeText={(input) => {
                        this.setState({
                            keyboardInput:input,
                        })
                    }}
                    autoFocus={false}
                    value={this.state.value}
                />
                </View>
                <TouchableOpacity style={{backgroundColor:"#ccc",height:36,width:40,marginLeft:5,}}  onPress={() => {
                    this.props.rightClick && this.props.rightClick(this.state.keyboardInput)
                }}>
                    <Text style={{marginTop:10,marginLeft:5}} >搜索</Text>
                </TouchableOpacity>
            </View>




           );
    }
}

const styles = StyleSheet.create({
    left:{
        flex:3,
        paddingLeft:5,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',

    },
    right:{
        flex:1,
        paddingRight:5,
        flexDirection: 'row',
        alignItems:'center',
    },
    rootview:{
        height: 35,
        width:350,
        backgroundColor: '#CCCCCC',
        borderColor:'#CCCCCC',
        borderRadius:1,
        /*justifyContent:'space-between',*/
        flexDirection: 'row',
        marginRight:20,
    },

    input:{height: 50,
        flex:1,
        maxWidth:150,
        justifyContent: 'center',
        alignItems: 'center',
        /*borderColor: '#000000',
        borderWidth: 1,*/
        marginTop:10,
        marginLeft:10,
        marginRight:20,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
    }
});
export default TitleBar;