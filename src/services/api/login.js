import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';

import DateHelper from '../../helper/dateHelper';
import {logApi} from './general';

const CONTROLLER = '/login';

const brand = DeviceInfo.getBrand();
const model = DeviceInfo.getModel();
const os = DeviceInfo.getSystemName();
const deviceID = DeviceInfo.getUniqueId();
var ip;
var mac;

publicIP().then(ipAddress => {
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
  var logData = {
    sentApi: 'login/selectCustomer',
    readApi: global.API_URL + CONTROLLER + '/customer/code/' + customerCode,
    apiPath: 'login',
    apiName: 'customer_get',
  };
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
        logData.errorCode = error.response.data.error_code;
        callback(false);
        logLogin(customerCode, 0);
      }
    })
    .finally(() => {
      logApi(logData);
    });
}

export function userLogin(email, password, customerCode, callback) {
  var logData = {
    sentApi: 'login/userLogin',
    readApi: global.API_URL + CONTROLLER + '/user',
    apiPath: 'login',
    apiName: 'user_post',
    userMail: email,
  };

  var fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  fd.append('customerCode', customerCode);
  axios
    .post(global.API_URL + CONTROLLER + '/user', fd)
    .then(response => {
      if (response.data) {
        callback(response.data);
        logLogin(customerCode, 1, email);
      } else {
        showMessage({
          message: response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
        logLogin(customerCode, 0, email);
        logData.errorCode = response.data.error_code;
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
        logData.errorCode = error.response.data.error_code;
      } else {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        callback(false);
        logLogin(customerCode, 0, email);
        logData.errorCode = error.response.data.error_code;
      }
    })
    .finally(() => {
      logApi(logData);
    });
}

const API = {
  selectCustomer,
  userLogin,
};

export default API;
