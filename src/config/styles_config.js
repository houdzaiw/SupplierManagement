import React, {Component} from 'react';
import {
    PixelRatio,
    Platform,
    Dimensions,
    NativeModules,
} from 'react-native';

const {height, width} = Dimensions.get('window');
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
function isIPhoneX() {
    return (
        Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH))
    )
}

module.exports = {
    height,
    width,
    isIPhoneX,
    iOS_STATUSBAR_HEIGHT:Platform.OS === 'ios'?(isIPhoneX()?44:20):20,
}




export function isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else {
        return regularStyle
    }
}