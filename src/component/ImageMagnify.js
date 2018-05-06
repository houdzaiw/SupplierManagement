import React, { Component } from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
const {height, width} = Dimensions.get('window');
export default class ImageMagnify extends  Component {
    constructor(props){
        super(props)
        this.state = {
            imgUrl:'',
            isShowImg:false,

        }
    }
    open(){
        this.setState({
            isShowImage:true,
        })
    }
    close(){
        this.setState({
            isShowImage:false,
        })
    }
    render(){
        if (this.state.isShowImage){
            return(
                <TouchableOpacity style={style.container} onPress={()=>{this.close()}}>
                    <Image source={{uri: this.props.imgUrl || ''}}
                           style={style.img_container}
                           resizeMode="cover"/>
                </TouchableOpacity>
            )
        }else {
            return <View />;
        }

    }

}
const style = StyleSheet.create({
    container:{
        backgroundColor:'#999',
        position:'absolute',
        height:height,
        width:width,
        top:0,
        left:0,
        alignItems:'center',
        paddingTop:(height-400)/2,
    },
    img_container:{
       width:width,
        height:250,
    },
})