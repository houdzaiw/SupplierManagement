import React,{Component} from "react";
import {Text, View, Linking,StyleSheet,TextInput,TouchableHighlight,TouchableOpacity,} from "react-native";
import {Card, Icon,Button,SearchBar} from 'react-native-elements';

class TopBanner extends Component{



    render() {
        //let wzzs=100;let changjia=100; let gongyingshang=10;
        return (
            <View style={styles.rootview}>
                <View  style={[styles.item]}>
                    <TouchableOpacity onPress={ this.props.callBackSupplier2 &&  this.props.callBackSupplier2}>
                    <Text style={this.props.active==1? styles.active:null}>供应商</Text>
                    </TouchableOpacity>
                </View>
                <View  style={[styles.item]}>
                    <TouchableOpacity onPress={ this.props.callBackSupplier &&  this.props.callBackSupplier}>
                    <Text   style={this.props.active==2? styles.active:null}>生产厂家</Text>
                    </TouchableOpacity>
                </View>
                <View  style={[styles.item]}>
                    <TouchableOpacity onPress={ this.props.callBackSupplier1 &&  this.props.callBackSupplier1}>
                    <Text style={this.props.active==3? styles.active:null}>产品总数</Text>
                    </TouchableOpacity>
                </View>
            </View>
           );
    }
} //<Text style={this.props.active==1? styles.active:null}>{gongyingshang}</Text>

const styles = StyleSheet.create({
    active:{
        color:'#0099CC',
    },
    item:{
        flex: 1,
        //textAlign:'center',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor:'#FFF',

    },
    rootview:{
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#f3f3f3',
        borderTopColor:'#CCCCCC',
        borderTopWidth:1,
    }
});
export default TopBanner;