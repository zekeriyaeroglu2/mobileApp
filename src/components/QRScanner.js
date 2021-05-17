import React, {useState} from 'react';

import {StyleSheet, Text, View, TextInput} from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.scanner}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          ref={node => {
            this.scanner = node;
          }}
          vibrate={vibrate}
          bottomContent={<Text>{message}</Text>}
        />
      </View>
    </View>
  );
};

/**
      
      <View style={styles.ref}>
        <Text>Veya Referans Kodu İle Dosya Yükle;</Text>

        <TextInput
          style={styles.email}
          placeholder="Referans Kodu"
          placeholderTextColor="black"
        />
      </View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  scanner: {
    flex: 3,
  },
  ref: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    margin: 6,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1b4074',
    color: 'black',
  },
});

export default QRScanner;
