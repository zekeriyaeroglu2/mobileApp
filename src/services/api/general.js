import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';

import DateHelper from '../../helper/dateHelper';

const brand = DeviceInfo.getBrand();
const model = DeviceInfo.getModel();
const os = DeviceInfo.getSystemName();

const CONTROLLER = '/general';

export function logApi(data) {
  var fd = new FormData();
  for (var key in data) {
    fd.append(key, data[key]);
  }
  fd.append('brand', brand);

  fd.append('addDate', DateHelper.getCurDate());
  fd.append('model', model);
  fd.append('systemName', os);
  axios
    .post(global.API_URL + CONTROLLER + '/logApi', fd)
    .then(response => {
      console.log('api logged');
    })
    .catch(error => {
      console.log('api log error');
      console.log(error);
    });
}

const API = {
  logApi,
};

export default API;
