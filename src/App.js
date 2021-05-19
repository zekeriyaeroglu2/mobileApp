import 'react-native-gesture-handler';
import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import codePush from 'react-native-code-push';

import Provider from './context/Provider';

import Routing from './routing/Routing';

//global
//global.API_URL = 'http://192.168.1.26/upload.php';
global.API_URL = 'http://192.168.1.26/proapp';
//global.API_URL = 'http://192.168.1.150/proapp';

//global.API_URL = 'https://proapp.codigno.com/index.php';

const App = () => {
  const [connect, setConnect] = React.useState(true);
  //Analytics.trackEvent('My custom event');
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnect(true);
      } else {
        setConnect(false);
      }
    });

    unsubscribe;
  }, [connect]);

  if (connect) {
    return (
      <Provider>
        <Routing />
      </Provider>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={require('./image/network-status.png')}
        />
        <Text style={styles.title}>Bağlantı Problemi</Text>
        <Text style={styles.desc}>
          Lütfen internet bağlantınızı kontrol edin.
        </Text>
      </View>
    );
  }
};

var {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: width * 0.5,
    height: 160,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    marginTop: 10,
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);
