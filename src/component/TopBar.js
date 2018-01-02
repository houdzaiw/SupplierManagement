import React,{Component} from "react";
import {Text, View, Linking,StyleSheet,TextInput,TouchableHighlight,} from "react-native";
import {Card, Icon,Button,SearchBar} from 'react-native-elements';

class TopBar extends Component{
    render() {
        return (
            <View style={styles.rootview}>
                <View  style={[styles.item,{textAlign:'left'}]}>
                    <Icon  name="arrow-round-back" size={20}/>
                </View>
                <View  style={[styles.item]}>
                    <Text>{this.props.title}</Text>
                </View>
                <View  style={[styles.item]}>
                </View>
            </View>
           );
    }
}

const styles = StyleSheet.create({
    item:{
        flex: 1,
        textAlign:'center',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor:'#FFF',

    },
    rootview:{
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ccc',
    }
});
export default TopBar;