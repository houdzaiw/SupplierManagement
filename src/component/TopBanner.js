import React,{Component} from "react";
import {Text, View, Linking,StyleSheet,TextInput,TouchableHighlight,TouchableOpacity,} from "react-native";
import {Card, Icon,Button,SearchBar} from 'react-native-elements';

class TopBanner extends Component{



    render() {
        let wzzs=100;let changjia=100; let gongyingshang=10;
        return (
            <View style={styles.rootview}>
                <View  style={[styles.item]}>
                    <Text style={this.props.active==1? styles.active:null}>供应商</Text>
                    <Text style={this.props.active==1? styles.active:null}>{gongyingshang}</Text>
                </View>
                <View  style={[styles.item]}>
                    <TouchableOpacity onPress={ this.props.callBackSupplier &&  this.props.callBackSupplier}>
                    <Text   style={this.props.active==2? styles.active:null}>生产厂家</Text>
                    </TouchableOpacity>
                    <Text style={this.props.active==2? styles.active:null}>{changjia}</Text>
                </View>
                <View  style={[styles.item]}>
                    <Text style={this.props.active==3? styles.active:null}>物资总数</Text>
                    <Text style={this.props.active==3? styles.active:null}>{wzzs}</Text>
                </View>
            </View>
           );
    }
}

const styles = StyleSheet.create({
    active:{
        color:'#0099CC',
    },
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
        backgroundColor: '#FFF',
        borderTopColor:'#CCCCCC',
        borderTopWidth:1,
    }
});
export default TopBanner;