import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';

import DateHelper from '../../helper/dateHelper';

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

function logLogin(customerCode, isSuccess, userMail = '') {
  var fd = new FormData();
  fd.append('customerCode', customerCode);
  fd.append('isSuccess', parseInt(isSuccess));
  fd.append('brand', brand);
  fd.append('model', model);
  fd.append('systemName', os);
  fd.append('deviceID', deviceID);
  fd.append('ipAdress', ip);
  fd.append('macAdress', mac);

  if (userMail !== '') {
    fd.append('userMail', userMail);
    fd.append('type', 2);
  } else {
    fd.append('type', 1);
  }

  fd.append('addDate', DateHelper.getCurDate());

  axios
    .post(global.API_URL + CONTROLLER + '/logLogin', fd)
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
    .get(global.API_URL + CONTROLLER + '/customer/code/' + customerCode)
    .then(response => {
      callback(response.data);
      logLogin(customerCode, 1);
    })
    .catch(error => {
      if (!error.response) {
        showMessage({
          message: 'Sunucu hatası.',
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
      } else {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
        logLogin(customerCode, 0);
      }
    });
}

export function userLogin(email, password, customerCode, callback) {
  var fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  fd.append('customerCode', customerCode);
  axios
    .post(global.API_URL + CONTROLLER + '/user', fd)
    .then(response => {
      if (response.data) {
        callback(response.data);
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
      if (!error.response) {
        showMessage({
          message: 'Sunucu hatası.',
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
      } else {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
        //logLogin(customerCode, 0);
      }
    });
}

const API = {
  selectCustomer,
  userLogin,
};

export default API;
