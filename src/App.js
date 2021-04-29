import * as React from 'react';
import type {Node} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import AppNavigation from './routing/AppNavigation';
import NetInfo from '@react-native-community/netinfo';
import codePush from 'react-native-code-push';

import Analytics from 'appcenter-analytics';

//global
global.API_URL = 'https://proapp.codigno.com/index.php';

const App = () => {
  const [connect, setConnect] = React.useState(true);
  Analytics.trackEvent('My custom event');
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
    return <AppNavigation />;
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
