import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../../image/logo/index';

const SplashScreen = props => {
  useEffect(() => {
    const auth = async () => {
      //await AsyncStorage.clear();
      const cusData = await AsyncStorage.getItem('customerData');
      const token = await AsyncStorage.getItem('token');
      if (cusData && token) {
        props.navigation.navigate('home');
      } else if (cusData && !token) {
        props.navigation.navigate('login');
      } else {
        props.navigation.navigate('start');
      }
    };
    //auth();
  });

  return (
    <View style={styles.loader}>
      <Image source={Images.loader} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
