import React, {Component} from "react";
import {Text, FlatList, View, StyleSheet, TouchableOpacity, Modal, Dimensions} from "react-native";
import {Card, Icon, Button, SearchBar} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

class OrderPopWindows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            isVisible:false,
            gys_data: [ {name: '222222222'}, {name: '333333333'}, {name: '444444444'}, {name: '555555555'}],
            cs_data: [{name: '2017-12-5'}, {name: '2017-12-6'}, {name: '2017-12-10'}],
        }
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({isVisible: nextProps.show});
    }

    openModal(isVisible) {
        this.setState({
            isVisible: isVisible
        });
    }

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(item) {

        return (
            <TouchableOpacity activeOpacity={1} style={styles.itemView} onPress={()=>{
                this.props.callBackParam && this.props.callBackParam(item.name)
            }}>
                <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    renderContent(){
        return(
            <View style={styles.container} activeOpacity={1} onPress={() => this.openModal(false)}>
                <View style={styles.modal}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>手术包名称</Text>
                        <View style={styles.businessName}>
                            {this.renderList(this.state.gys_data)}
                        </View>
                    </View>
                    <View style={{flex:1,marginTop:25}}>
                        <Text style={styles.textStyle}>订单时间</Text>
                        <View style={styles.businessName}>
                            {this.renderList(this.state.cs_data)}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent:'center',alignItems: 'center',height:40}}>
                        <Text onPress={()=>this.openModal(false)}
                              style={{padding:3,borderRadius: 10,flex: 1,flexDirection: 'row',justifyContent:'center',
                                  alignItems: 'center',textAlign:'center'}}>
                            关闭
                        </Text>
                        {/*<Text style={{padding:3,borderRadius: 10,flexDirection: 'row',flex: 1,justifyContent:'center',alignItems: 'center',textAlign:'center'}}>确定</Text>*/}
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isVisible}
                animationType={'fade'}
                onRequestClose={() => this.openModal(true)}
            >
                <View style={{flex:1}}>
                    {this.renderContent()}
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modal: {
        marginTop:95,
        backgroundColor: '#FFF',
        height: height/3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:20,
    },
    itemView: {
        margin:2,
        padding: 3,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 0.5,
        flexDirection: 'row'
    },
    textStyle: {
        color: '#000',
        fontSize: 14,
        textAlign:'center',
    },
    businessName:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop:10,
    }
});
export default OrderPopWindows;