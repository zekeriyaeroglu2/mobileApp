import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

import DateHelper from '../../helper/dateHelper';
import {logApi} from './general';

const CONTROLLER = '/file';

export function RefInfo(data, callback) {
  var fd = new FormData();
  fd.append('refID', data.refID);
  fd.append('refType', data.refType);
  fd.append('customerCode', data.customerCode);
  fd.append('token', data.token);

  var logData = {
    sentApi: 'file/refInfo',
    readApi: global.API_URL + CONTROLLER + '/refInfo',
    apiPath: 'file',
    apiName: 'refInfo_post',
    userMail: data.email,
    others: JSON.stringify(fd),
    token: data.token,
  };

  axios
    .post(global.API_URL + CONTROLLER + '/refInfo', fd)
    .then(response => {
      callback(response.data.message);
    })
    .catch(error => {
      if (!error.response) {
        showMessage({
          message: 'Sunucu hatası.',
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        logData.errorCode = error.message;
      } else {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
        logData.errorCode = error.response.data.error_code;
        logData.others = JSON.stringify(error.response.data);
      }
    })
    .finally(() => {
      logApi(logData);
    });
}

export function FileUpload(data, callback) {
  var fd = new FormData();
  /*fd.append('refID', data.refID);
  fd.append('refType', data.refType);
  fd.append('customerCode', data.customerCode);
  fd.append('token', data.token);*/
  fd.append('file', data.fileData);
  /*fd.append('file[name]', data.fileData.fileName);
  fd.append('file[size]', data.fileData.fileSize);
  fd.append('file[type]', data.fileData.type);*/
  /*axios
    .post(global.API_URL + CONTROLLER + '/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.log(error);
      if (!error.response) {
        showMessage({
          message: 'Sunucu hatası.',
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
      } else {
        console.log(error.response);
        /*showMessage({
          message: error.response.data,
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
      }
    });*/
  fetch(global.API_URL + CONTROLLER + '/upload', {
    // Your POST endpoint
    method: 'POST',
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      'Content-Type': 'multipart/form-data',
    },
    body: fd, // This is your file object
  })
    .then(
      response => response.json(), // if the response is a JSON object
    )
    .then(data2 => callback(data2))
    .catch(
      error => console.log('error', error), // Handle the error response object
    );
}

const File = {
  RefInfo,
  FileUpload,
};

export default File;
