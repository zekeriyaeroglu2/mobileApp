import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';

const CONTROLLER = '/login';

const brand = DeviceInfo.getBrand();
const model = DeviceInfo.getModel();
const os = DeviceInfo.getSystemName();
const deviceID = DeviceInfo.getUniqueId();
var ip;
var mac;
DeviceInfo.getIpAddress().then(ipAddress => {
  ip = ipAddress;
});
DeviceInfo.getMacAddress().then(macAddress => {
  mac = macAddress;
});

function logCustomer(customerCode, isSuccess) {
  var fd = new FormData();
  fd.append('customerCode', customerCode);
  fd.append('isSuccess', parseInt(isSuccess));
  fd.append('brand', brand);
  fd.append('model', model);
  fd.append('systemName', os);
  fd.append('deviceID', deviceID);
  fd.append('ipAdress', ip);
  fd.append('macAdress', mac);

  axios
    .post(global.API_URL + CONTROLLER + '/logCustomer', fd)
    .then(response => {
      if (response.data.success) {
        console.log('customer logged');
      }
    })
    .catch(error => {
      console.log('customer log error');
    });
}

export function selectCustomer(customerCode, callback) {
  axios
    .get(global.API_URL + CONTROLLER + '/getCustomerInfo/' + customerCode)
    .then(response => {
      if (response.data.success) {
        callback(response.data.message);
        logCustomer(customerCode, 1);
      } else {
        showMessage({
          message: response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
        logCustomer(customerCode, 0);
      }
    })
    .catch(error => {
      showMessage({
        message: 'Sunucuya bağlanırken bir hata oluştu.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      console.log('asd');
    });
}

export function userLogin(email, password, customerCode, callback) {
  var fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  fd.append('customerCode', customerCode);
  axios
    .post(global.API_URL + CONTROLLER + '/userLogin', fd)
    .then(response => {
      if (response.data.success) {
        callback(response.data.message);
      } else {
        showMessage({
          message: response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
      }
    })
    .catch(error => {
      console.log(error);
      showMessage({
        message: 'Sunucuya bağlanırken bir hata oluştu.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
    });
}

const API = {
  selectCustomer,
  userLogin,
};

export default API;
