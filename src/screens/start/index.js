import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import Context from '../../context/store';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import {showMessage} from 'react-native-flash-message';
import loginAPI from '../../services/api/login';
import dateHelper from '../../helper/dateHelper';

import Recaptcha from 'react-native-recaptcha-that-works';
import {Platform} from 'react-native';

const StartScreen = ({navigation}) => {
  const [customerCode, setCustomerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tryNum, setTryNum] = useState(0);
  const [blockDate, setBlockDate] = useState('');

  const {state, dispatch} = useContext(Context);

  const $recaptcha = useRef();

  const handleOpenCaptchaPress = useCallback(() => {
    setTimeout(() => {
      $recaptcha.current.open();
    }, 500);
  }, []);

  useEffect(() => {
    getCustomerTryCount();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const getCustomerTryCount = async () => {
    try {
      //await AsyncStorage.clear();
      const cusTryCount = await AsyncStorage.getItem('@customerTryCount');
      const cusBlockDate = await AsyncStorage.getItem('@customerBlockDate');
      const cusBlockHm = await AsyncStorage.getItem('@customerBlockHm');
      if (cusBlockDate <= dateHelper.getCurDate()) {
        await AsyncStorage.clear();
        await setTryNum(10);
        await setBlockDate('');
      }
      if (cusTryCount !== null) {
        setTryNum(parseInt(cusTryCount, 10));
        setBlockDate(cusBlockHm);
      }
    } catch (e) {
      console.log('customerTryCount get error.');
    }
  };

  const setCustomerTryCount = async () => {
    try {
      await AsyncStorage.setItem('@customerTryCount', (tryNum + 1).toString());
      await AsyncStorage.setItem(
        '@customerBlockDate',
        dateHelper.getCurDateAdd(10, 'minutes'),
      );
      await AsyncStorage.setItem(
        '@customerBlockHm',
        dateHelper.getCurDateAdd(10, 'minutes', 'HH:mm'),
      );
      setBlockDate(dateHelper.getCurDateAdd(10, 'minutes', 'HH:mm'));
    } catch (e) {
      console.log('customerTryCount set error.');
    }
  };

  const checkCustomerCode = async () => {
    setIsLoading(true);
    if (!customerCode.trim() || customerCode % 1 !== 0 || !customerCode > 0) {
      showMessage({
        message: 'Lütfen Geçerli Bir Müşteri Kodu Giriniz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
    } else {
      loginAPI.selectCustomer(customerCode, data => {
        if (data) {
          AsyncStorage.setItem('customerData', JSON.stringify(data));
          AsyncStorage.setItem('customerCode', customerCode);
          dispatch({type: 'CUSTOMER_CODE', customerCode});
          //navigation.navigate('login');
          showMessage({
            message: 'Müşteri seçme işlemi başarılı.',
            type: 'success',
            icon: {icon: 'auto', position: 'left'},
          });
        } else {
          setTryNum(tryNum + 1);
          if (tryNum >= 1 && tryNum <= 3) {
            handleOpenCaptchaPress();
          }
          if (tryNum >= 4) {
            setCustomerTryCount();
          }
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Animatable.Image
          source={require('../../image/logo/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
          animation="fadeInDown"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.title}>
          Sürdürülebilir verilerinizin toplanmasını dijitalleştirin.
        </Text>
        <View style={styles.form}>
          {blockDate !== '' && (
            <Text style={styles.blockText}>
              Giriş yapmanız engellenmiştir, Şu saatten sonra tekrar deneyiniz;
              {blockDate}
            </Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Müşteri Kodu"
            value={customerCode}
            onChangeText={setCustomerCode}
            keyboardType={'number-pad'}
            placeholderTextColor="black"
          />
          <TouchableOpacity
            onPress={checkCustomerCode}
            style={styles.signIn}
            disabled={tryNum >= 5 ? true : false}>
            <LinearGradient
              colors={['#1B4074', '#1B4074']}
              style={styles.signIn}>
              {isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  color={'white'}
                  size={'large'}
                />
              ) : (
                <Text style={{color: '#fff', fontSize: 20}}>Devam Et</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Recaptcha
            ref={$recaptcha}
            siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
            baseUrl="http://127.0.0.1"
            onVerify={() => {
              console.log('verify');
            }}
            onExpire={() => {
              console.log('expire');
            }}
          />
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default StartScreen;
