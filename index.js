import { AppRegistry } from 'react-native';
import App from './App';
import MySorage from './src/component/MySorage'
global.storage = MySorage._getStorage();
global.config = {
    url:'http://localhost:8080/yywl-gyswl',
};
AppRegistry.registerComponent('SupplierManagement', () => App);
