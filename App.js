/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    Image,
    Platform,
    Button,
    Text,
    TextInput,
} from 'react-native';
import {Icon} from "react-native-elements"
import styleConfig from './src/config/styles_config';
import {StackNavigator, TabNavigator } from "react-navigation";
import  supplierlistscreen from './src/supplier/screens/supplierlistscreen';
import  company from './src/company/screens/companysListScreen';
import  productsListScreen from './src/product/screens/productsListScreen';
import  userscreen from './src/user/screens/userscreen';

import  supplier_detail from './src/supplier/screens/supplier-detail';
import  product_detail from './src/product/screens/product-detail.screen';
import  company_detail from './src/company/screens/company-detail.screen';
import  login from './src/auth/screens/login.screen';

import  search from './src/search/screens/search.screen';
import  searchlistscreen from './src/search/screens/search.list.screen';

import userupdatepassword from './src/user/screens/passwordscreen';
import user_info from './src/user/screens/user.screen';
import user_nc from './src/user/screens/nicknamescreen';
import  user_dd from './src/order/screens/order-list';
import user_dlc from './src/order/screens/process.screen';
import goods_sp from './src/order/screens/goods.screen';
import orderlist from './src/order/screens/order-list';
import ddss from './src/order/screens/order.search';
import order from './src/order/screens/order.search';
import  cps from './src/product/screens/cp';
import ssb from './src/order/screens/operation.screen';
import wz from './src/order/screens/wuzi.screen';
 //import calendar from './src/order/screens/calendar';
import agenda from './src/order/screens/agenda';
import  tp from './src/component/ImageShow';
import forget from './src/user/screens/forgetpassword';





global.globConfig = styleConfig;
const MainScreenNavigator = TabNavigator({
    Supplier:{
        screen: supplierlistscreen,
        navigationOptions:{
            tabBarLabel:'供应商',
            tabBarIcon:({tintColor}) => <Icon name={"people"} size={20} color={tintColor}/>,
        },

        },

    /*Company:{
        screen:companysListScreen,
        navigationOptions:{
            tabBarLabel:'厂商',
            tabBarIcon:({tintColor}) => <Icon name={"folder-open"} size={20} color={tintColor}/>,
        }},*/
    /*Company:{
        screen:orderlist,
        navigationOptions:{
            tabBarLabel:'订单',
            tabBarIcon:({tintColor}) => <Icon name={"folder-open"} size={20} color={tintColor}/>,
        }},*/
    Agenda:{
        screen:agenda,
        navigationOptions:{
            tabBarLabel:'订单',
            headerTitleStyle: {alignSelf:'center',fontSize: 18, color: '#F9F9FA',marginRight:60},
            tabBarIcon:({tintColor}) => <Icon name={"folder-open"} size={20} color={tintColor}/>,
        }},

    Product:{
        screen:productsListScreen,
        navigationOptions:{
            tabBarLabel:'产品',
            //tabBarIcon:({tintColor}) => (<Image source={require('./asset/1.png')} style={[{tintColor: tintColor,height:20,width:20}]}/>),
            tabBarIcon:({tintColor}) => <Icon name={"home"} size={20} color={tintColor}/>,
        }},

    User:{
        screen:userscreen,
        navigationOptions:{
            tabBarLabel:'我的',
            headerTitleStyle: {alignSelf:'center',fontSize: 18, color: '#F9F9FA',marginRight:60},
            tabBarIcon:({tintColor}) => <Icon name={"person"} size={20} color={tintColor}/>,
        }
    },
},{
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    lazy:true,
    tabBarOptions: {
        activeTintColor: '#0084FF', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
             //height: 44
        },
        labelStyle: {
            fontSize: 10, // 文字大小,
        },
    }
})

const SimpleApp = StackNavigator({
    login: { screen: login,
        navigationOptions: {
            headerTitle: '登录',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},
    Home:{
        screen:MainScreenNavigator,
    },
    search: { screen: search,
        navigationOptions: {
            header:null,
        }},
    order:{screen: order,
        navigationOptions: {
            header:null,
        }},
    search_list: { screen: searchlistscreen,
        navigationOptions: {
            header:null,
        }},
    supplier_detail: { screen: supplier_detail,
        navigationOptions: {
        headerTitle: '供应商详情',
        headerTitleStyle: {
            fontSize: 14,
            color: '#F9F9FA',
        },
        headerStyle: {
            height: 50,
            /*marginBottom: 15,*/
            backgroundColor: '#CCCCCC',
        },
    }},
    product_detail: { screen: product_detail,
        navigationOptions: {
            headerTitle: '产品详情',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
               /* marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    company_detail: { screen: company_detail,
        navigationOptions: {
            headerTitle: '公司详情',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},
    userupdatepassword: { screen: userupdatepassword,
        navigationOptions: {
            headerTitle: '修改密码',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},
    user_info: { screen: user_info,
        navigationOptions: {
            headerTitle: '修改信息',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
               /* marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    user_nc: { screen: user_nc,
        navigationOptions: {
            headerTitle: '更改昵称',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},


    /*user_dd: { screen:  user_dd,
        navigationOptions: {
            headerTitle: '我的订单',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                marginBottom: 15,
                backgroundColor: '#CCCCCC',
            },
        }},*/
    user_dlc: { screen:  user_dlc,
        navigationOptions: {
            headerTitle: '订单流程',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    goods_sp: { screen:  goods_sp,
        navigationOptions: {
            headerTitle: '产品详情',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},
    company: { screen: company,
        navigationOptions: {
            headerTitle: '厂商列表',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    login: { screen: login,
        navigationOptions: {
            headerTitle: '登录',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},
    //产品页测试
    cps: { screen: cps,
        navigationOptions: {
            headerTitle: '产品',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},


    ssb: { screen: ssb,
        navigationOptions: {
            headerTitle: '手术包详情',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    wz: { screen: wz,
        navigationOptions: {
            headerTitle: '物资',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    agenda: { screen: agenda,
        navigationOptions: {
            headerTitle: '日历',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},

    forget:{ screen: forget,
        navigationOptions: {
            headerTitle: '找回密码',
            headerTitleStyle: {
                fontSize: 14,
                color: '#F9F9FA',
            },
            headerStyle: {
                height: 50,
                /*marginBottom: 15,*/
                backgroundColor: '#CCCCCC',
            },
        }},






});



export default SimpleApp;
// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
