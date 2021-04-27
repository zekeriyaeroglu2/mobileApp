import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../../image/logo/index';

const SplashScreen = props => {
  const [customer, setCustomer] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    auth();

    /*const getUser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(false);
      }
    };
    getUser();

    const navigate = () => {
      if (customer && user) {
        props.navigation.navigate('home', {userInfo: user});
      } else if (customer != null && user == null) {
        console.log(customer);
        console.log('login');
        props.navigation.navigate('login', {customerInfo: customer});
      } else {
        console.log('start');
        props.navigation.navigate('start');
      }
    };
    navigate();
    */
  });

  const auth = async () => {
    //await AsyncStorage.clear();
    const cusData = await AsyncStorage.getItem('customerData');
    const userData = await AsyncStorage.getItem('userData');
    if (cusData && userData) {
      props.navigation.navigate('home');
    } else if (cusData && !userData) {
      props.navigation.navigate('login');
    } else {
      props.navigation.navigate('start');
    }
  };

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
