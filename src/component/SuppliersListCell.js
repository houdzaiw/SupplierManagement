import React, {Component} from "react";
import {Text, View, Linking,StyleSheet} from "react-native";
import {Card, Icon} from 'react-native-elements';

class SuppliersListCell extends Component{

}

const styles = StyleSheet.create({
    cardContainerStyle: {

        padding: 0,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 3,
        marginBottom: 4,
        borderBottomColor: '#BBBBBB',
        borderTopColor: '#FAFAFA',
        borderBottomWidth: 0.3,
        borderTopWidth: 0.1
    },
    cardWrapperStyle: {

        marginRight: 25,
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 20
    },
    textTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '300',
        color: 'black',
        marginBottom: 12
    },
    textContent: {
        textAlign: 'left',
        fontSize: 14,
        color: '#444444',
        marginBottom: 3
    },
    textHeader: {
        textAlign: 'left',
        fontSize: 14,
        color: '#999999'
    },
    textFooter: {
        textAlign: 'left',
        fontSize: 14,
        color: '#999999',
        marginTop: 10
    }
});
export default SuppliersListCell