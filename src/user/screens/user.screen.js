import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements';
//图片选择器
const ImagePicker = require('react-native-image-picker');
//图片选择器参数设置
const options = {
    title: '请选择图片来源',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class userscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: {uri: 'http://www.qqw21.com/article/uploadpic/2012-9/201291893228996.jpg'},
        }
    }

    //选择照片按钮点击
    choosePic() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    _toUpdateNc = () => {
        const {navigate} = this.props.navigation;
        if (navigate) {
            navigate('user_nc');
        }

    };


    render() {
        return (
           <View style={{marginTop:global.globConfig.iOS_STATUSBAR_HEIGHT}}>
            <View>
                <View style={{
                    flexDirection: 'row', /*borderColor: '#FFF',borderWidth: 1,
                    borderStyle: 'solid',*/ height: 80, backgroundColor: "#FFF",marginBottom:10,

                }}>
                    <Text onPress={this.choosePic.bind(this)} style={{marginLeft: 10, marginTop: 25, fontSize: 20,color:"#000"}}>头像</Text>
                    <Image  style={{width: 50, height: 50,marginLeft:250,marginTop:10,}}
                           source={this.state.avatarSource}/>

                </View>
                <View style={{
                    flexDirection: 'row', /*borderColor: '#FFF',borderWidth: 1,
                    borderStyle: 'solid', */height: 50, backgroundColor: "#FFF",marginBottom:10,

                }}>
                    <Text onPress={this._toUpdateNc} style={{fontSize: 18, marginLeft: 10, marginTop: 15,
                        color:"#000"}}>昵称</Text>
                    <Text style={{marginLeft:240, marginTop: 15,color:"#797979",fontSize:16,}}>你好，明天</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 50, backgroundColor: "#FFF",marginBottom:10,
                    /*borderColor:'#ccc', borderStyle:'solid',borderWidth:0.5,*/
                }}>
                    <Text style={{fontSize: 18, marginLeft: 10, marginTop: 15,color:"#000"}}>性别</Text>
                    <Text style={{fontSize: 18, marginLeft: 300, marginTop: 15,color:"#797979",fontSize:16,}}>女</Text>
                </View>
            </View>
            </View>





                /*<View>
                    <View style={{
                    flexDirection: 'row', borderColor: '#ccc',
                    borderStyle: 'solid', height: 80, backgroundColor: "#FFF",
                    borderWidth: 1,
                }}>
                     <TouchableOpacity onPress={this.choosePic.bind(this)}>
                    <Text onPress={this.choosePic.bind(this)} style={{marginLeft: 10, marginTop: 25, fontSize: 20,color:"#000"}}>头像</Text>
                     </TouchableOpacity>
                    <Image  style={{width: 50, height: 50,marginLeft:250,marginTop:10,}}
                            source={this.state.avatarSource}/>
                </View>

                    <View style={{
                        flexDirection: 'row', borderColor: '#ccc',
                        borderStyle: 'solid', height: 50, backgroundColor: "#FFF",
                        borderWidth: 1,
                    }}>
                        <TouchableOpacity onPress={this._toUpdateNc}>
                        <Text  style={{marginLeft: 10, marginTop: 15, fontSize: 18,color:"#000"}}>昵称</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16,marginLeft:240, marginTop: 15,color:"#797979",}}>你好，明天</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row', borderColor: '#ccc',
                        borderStyle: 'solid', height: 50, backgroundColor: "#FFF",
                        borderWidth: 1,
                    }}>
                        <Text  style={{marginLeft: 10, marginTop: 15, fontSize: 18,color:"#000"}}>性别</Text>
                        <Text style={{fontSize: 16,marginLeft:240, marginTop: 15,color:"#797979",}}>女</Text>
                    </View>

                </View>*/
        );
    }
}

const styles=StyleSheet.create({
    AA:{
        flex: 1,
        backgroundColor: '#EFEFEF',

    },
});

export default userscreen;