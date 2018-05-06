
import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'http://tvax2.sinaimg.cn/crop.75.52.783.783.1024/d302e6c5ly8ffhedvbh9uj20rs0rsgn5.jpg'
}, {
    url: 'http://d7.yihaodianimg.com/N07/M03/B1/64/CgQI0FecBs6AF5eIAACWqtLv00828500.jpg'
}, {
    url:'http://img.mp.itc.cn/upload/20160511/0c0f5533b4ac4c6d9b1ebdaf43320c9f_th.jpg'
}, {
    url:'http://img.heibaimanhua.com/wp-content/uploads/2016/05/20/20160520_573e6c33d17b5.jpg'
}]

export default class ImageShow extends Component {

    constructor(props){
        super(props);
        this.state = {
            isImageShow:true,
        }
    }
    isOpenModel(){
        this.setState({
            isImageShow:true,
        })
    }

    render() {
        var arrImg = [];
        this.props.imgUrl.forEach((item)=>{
            arrImg.push({
                url:global.config.urlimg+item,
            })
        })

        return (
            <Modal visible={this.state.isImageShow} transparent={true}>
                <ImageViewer imageUrls={arrImg}
                             onClick={()=> {
                                 this.setState({
                                     isImageShow: false,
                                 });
                             }}
                             saveToLocalByLongPress={false}/>
            </Modal>
        )
    }
}