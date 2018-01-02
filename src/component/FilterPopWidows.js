import React, {Component} from "react";
import {Text, FlatList, View, StyleSheet, TouchableOpacity, Modal, Dimensions} from "react-native";
import {Card, Icon, Button, SearchBar} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

class FilterPopWidows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            gys_data: [{name: '上海商略商贸公司'}, {name: '上海商略商贸公司'}, {name: '上海商略商贸公司'}, {name: '上海商略商贸公司'}, {name: '上海商略商贸公司'}],
            cs_data: [{name: '上海三友'}, {name: '昆明炬森'}, {name: '北京富乐'},],
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(item) {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.itemView}>
                <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => this.closeModal()}>
                        <View style={styles.modal}>
                            <Text style={styles.textStyle}>供应商名称</Text>
                            <View style={{flexDirection: 'row',flex: 1,flexWrap: 'wrap',alignItems: 'center',}}>
                                {this.renderList(this.state.gys_data)}
                            </View>
                            <Text style={styles.textStyle}>厂商名称</Text>
                            <View style={{flexDirection: 'row',flex: 1,flexWrap: 'wrap',alignItems: 'center',}}>
                                {this.renderList(this.state.cs_data)}
                            </View>
                            <View style={{flexDirection: 'row',flex: 1,flexWrap: 'wrap',justifyContent:'center',alignItems: 'center',marginTop:50}}>
                                <Text style={{flex: 1}}/>
                                <Text onPress={()=>this.closeModal()} style={{backgroundColor: '#00CCFF',padding:3,borderRadius: 10,flex: 1,flexDirection: 'row',justifyContent:'center',alignItems: 'center',textAlign:'center'}}>取消</Text>
                                <Text style={{flex: 1}}/>
                                <Text style={{backgroundColor: '#00CCFF',padding:3,borderRadius: 10,flexDirection: 'row',flex: 1,justifyContent:'center',alignItems: 'center',textAlign:'center'}}>确定</Text>
                                <Text style={{flex: 1}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modal: {
        backgroundColor: '#FFF',
        width: width,
        //height: height/2,
        position: 'absolute',
        left: 0,
        top: 55,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
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
    },
});
export default FilterPopWidows;