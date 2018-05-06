import { AppRegistry } from 'react-native';
import App from './App';
import MySorage from './src/component/MySorage'
global.storage = MySorage._getStorage();
global.config = {
     //url:'http://118.190.157.145:8080/yywl-gyswl',
    url:'http://localhost:8080/yywl-gyswl',
    //url:'http://192.168.1.245:8080/yywl-gyswl',
    urlimg:'http://localhost:8080/img/',
    //url:'http://192.254.1.9:1688/yywl-gyswl',
    //url:'http://192.168.1.9:1688/yywl-gyswl',
};
AppRegistry.registerComponent('SupplierManagement', () => App);
