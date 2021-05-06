import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import type {Node} from 'react';

import Context from '../context/store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FlashMessage from 'react-native-flash-message';

import StartScreen from '../screens/start';
import LoginScreen from '../screens/login';

import SplashScreen from '../screens/splash';
import FileUpload from '../screens/fileUpload';
import TabNavigator from './TabNavigator';
import QRScanner from '../components/QRScanner';

const Stack = createStackNavigator();

const Routing = () => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(false);
  const [customer, setcustomer] = useState(false);

  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    authCustomer();
  }, [state.customerCode]);

  useEffect(() => {
    authUser();
  }, [state.token]);

  const authCustomer = async () => {
    const cusData = await AsyncStorage.getItem('customerData');
    if (cusData) {
      setcustomer(true);
    } else {
      setcustomer(false);
    }
    setloading(false);
  };

  const authUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setuser(true);
    } else {
      setuser(false);
    }
    setloading(false);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer initialRouteName="start">
      <Stack.Navigator>
        {!customer ? (
          <Stack.Screen
            name="start"
            component={StartScreen}
            options={{headerShown: false}}
          />
        ) : !user ? (
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={TabNavigator}
              options={{headerShown: true, title: 'Anasayfa'}}
            />
            <Stack.Screen
              name="qrscanner"
              component={QRScanner}
              options={{headerShown: true, title: 'QR Kod Okuyucu'}}
            />
            <Stack.Screen
              name="fileupload"
              component={FileUpload}
              options={{headerShown: true, title: 'Dosya Yükle'}}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};
export default Routing;
