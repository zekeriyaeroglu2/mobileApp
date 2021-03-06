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
  KeyboardAvoidingView
} from 'react-native';

import Context from '../../context/store';

import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import {showMessage} from 'react-native-flash-message';
import loginAPI from '../../services/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateHelper from '../../helper/dateHelper';

import Recaptcha from 'react-native-recaptcha-that-works';

const LoginScreen = ({route, navigation}) => {
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [tryNum, setTryNum] = useState(0);
  const [blockDate, setBlockDate] = useState('');
  const [logo, setLogo] = useState();
  const [color, setColor] = useState();

  const {state, dispatch} = useContext(Context);

  const $recaptcha = useRef();

  const handleOpenCaptchaPress = useCallback(() => {
    setTimeout(() => {
      $recaptcha.current.open();
    }, 500);
  }, []);

  useEffect(() => {
    let componentMounted = true;

    getUserLoginTryCount();

    const _setCustomer = () => {
      //AsyncStorage.clear();
      AsyncStorage.getItem('customerData').then(cusData => {
        if (cusData != null) {
          let parsedCusData = JSON.parse(cusData);
          let parsedCusInfo = JSON.parse(parsedCusData.customerInfo);
          if (componentMounted) {
            setCustomer(parsedCusData);
            setLogo(parsedCusInfo.logo);
            setColor(parsedCusInfo.backgroundColor);
            setPageLoading(false);
          }
        } else {
        }
      });
    };
    _setCustomer();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      //useEffect cleanup
      componentMounted = false;
      setIsLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserLoginTryCount = async () => {
    try {
      //await AsyncStorage.clear();
      const logTryCount = await AsyncStorage.getItem('@userLoginTryCount');
      const logBlockDate = await AsyncStorage.getItem('@userLoginBlockDate');
      const logBlockHm = await AsyncStorage.getItem('@userLoginBlockHm');
      if (logBlockDate < dateHelper.getCurDate()) {
        await AsyncStorage.clear();
        setTryNum(0);
        setBlockDate('');
      }
      if (logTryCount !== null) {
        setTryNum(parseInt(logTryCount, 10));
        setBlockDate(logBlockHm);
      }
    } catch (e) {
      console.log('userLoginTryCount get error.');
    }
  };

  const setUserLoginTryCount = async () => {
    try {
      await AsyncStorage.setItem('@userLoginTryCount', (tryNum + 1).toString());
      await AsyncStorage.setItem(
        '@userLoginBlockDate',
        dateHelper.getCurDateAdd(10, 'minutes'),
      );
      await AsyncStorage.setItem(
        '@userLoginBlockHm',
        dateHelper.getCurDateAdd(10, 'minutes', 'HH:mm'),
      );
      setBlockDate(dateHelper.getCurDateAdd(10, 'minutes', 'HH:mm'));
    } catch (e) {
      console.log('userLoginTryCount set error.');
    }
  };

  const checkForm = () => {
    setIsLoading(true);
    if (!email.trim() && !password.trim()) {
      showMessage({
        message: 'L??tfen E-Posta Adresi ve ??ifre Alanlar??n?? Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }
    if (!email.trim()) {
      showMessage({
        message: 'L??tfen E-Posta Adresi Alan??n?? Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      showMessage({
        message: 'L??tfen ??ifre Alan??n?? Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }

    loginAPI.userLogin(email, password, customer.customerCode, userData => {
      if (userData) {
        showMessage({
          message: 'Kullan??c?? giri?? i??lemi ba??ar??l??.',
          type: 'success',
          icon: {icon: 'auto', position: 'left'},
        });
        let token = String(userData.token);
        let userEmail = userData.userEmail;
        AsyncStorage.setItem('userData', JSON.stringify(userData));
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userEmail', userEmail);
        dispatch({type: 'TOKEN', token});
        dispatch({type: 'USER_EMAIL', userEmail});
        //navigation.navigate('home');
      } else {
        setIsLoading(false);
        setTryNum(tryNum + 1);
        if (tryNum >= 1 && tryNum <= 3) {
          handleOpenCaptchaPress();
        }
        if (tryNum >= 4) {
          setUserLoginTryCount();
        }
      }
    });
  };

  if (pageLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={[styles.container, {backgroundColor: color}]} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
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
          S??rd??r??lebilir verilerinizin toplanmas??n?? dijitalle??tirin.
        </Text>
        <Text style={styles.text}>Hesab??n??za giri?? yap??n.</Text>
        <View style={styles.form}>
          {blockDate !== '' && (
            <Text style={styles.blockText}>
              Giri?? yapman??z engellenmi??tir, ??u saatten sonra tekrar deneyiniz;
              {blockDate}
            </Text>
          )}
          <TextInput
            style={styles.email}
            placeholder="E-Posta Adresi"
            onChangeText={setEmail}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.password}
            placeholder="??ifre"
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor="black"
          />
          <TouchableOpacity
            onPress={checkForm}
            style={styles.signIn}
            disabled={tryNum >= 5 ? true : false}>
            <LinearGradient
              colors={['#1B4074', '#1B4074']}
              style={styles.signIn}
              disabled={tryNum >= 5 ? true : false}>
              {isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  color={'white'}
                  size={'large'}
                />
              ) : (
                <Text style={{color: '#fff', fontSize: 20}}>Giri?? Yap</Text>
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
export default LoginScreen;
