import React, {Component, useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRScanner = ({navigation}) => {
  const [message, setmessage] = useState('');
  const [vibrate, setvibrate] = useState(true);

  const onSuccess = data => {
    if (data.data.charAt(0) === '{') {
      setvibrate(true);
      navigation.navigate('home');
      navigation.navigate('fileupload', {data: data.data});
    } else {
      setmessage('QR Kod tanımlanamadı. Lütfen tekrar deneyiniz.');
      setvibrate(false);
      this.scanner.reactivate();
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      ref={node => {
        this.scanner = node;
      }}
      vibrate={vibrate}
      bottomContent={<Text>{message}</Text>}
    />
  );
};

export default QRScanner;
