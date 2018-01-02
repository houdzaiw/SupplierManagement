import React,{Component} from "react";
import {Text, View, Linking,StyleSheet,TextInput,TouchableHighlight,} from "react-native";
import {Card, Icon,Button,SearchBar} from 'react-native-elements';

class TitleBar extends Component{
    render() {
        return (
            <View style={styles.rootview}>
                <TouchableHighlight onPress={() => this.props.leftClick()} style={styles.left} >
                <View  style={styles.left}>
                    <Icon  name="search" size={20}/>
                    <Text style={{flexDirection:'row',flex:1}}>点击进行搜索...</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.right} onPress={() => this.props.rightClick()}>
                <View style={styles.right}>
                    <Icon name="reorder"/>
                    <Text>快速筛选</Text>
                </View>
                </TouchableHighlight>
            </View>
           );
    }
}

const styles = StyleSheet.create({
    left:{
        paddingLeft:5,
        flex: 2,
        flexDirection: 'row',
        textAlign:'left',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor:'#FFF',

    },
    right:{
        paddingRight:5,
        flex: 2,
        flexDirection: 'row',
        textAlign:'right',
        alignItems:'center',
        justifyContent: 'flex-end',

    },
    rootview:{
        flexDirection: 'row',
        height: 35,
        backgroundColor: '#CCCCCC',
        borderColor:'#CCCCCC',
        //borderWidth:1,
        borderRadius:1,
    }
});
export default TitleBar;