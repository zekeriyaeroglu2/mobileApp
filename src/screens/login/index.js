import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import Context from '../../context/store';

import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import {showMessage} from 'react-native-flash-message';
import loginAPI from '../../services/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateHelper from '../../helper/dateHelper';

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
        message: 'Lütfen E-Posta Adresi ve Şifre Alanlarını Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }
    if (!email.trim()) {
      showMessage({
        message: 'Lütfen E-Posta Adresi Alanını Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      showMessage({
        message: 'Lütfen Şifre Alanını Doldurunuz.',
        type: 'danger',
        icon: {icon: 'auto', position: 'left'},
      });
      setIsLoading(false);
      return;
    }

    loginAPI.userLogin(email, password, customer.customerCode, userData => {
      if (userData) {
        showMessage({
          message: 'Kullanıcı giriş işlemi başarılı.',
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
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.header}>
        <Animatable.Image
          source={{
            uri: logo,
          }}
          style={styles.logo}
          resizeMode="stretch"
          animation="fadeInDown"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.title}>
          Sürdürülebilir verilerinizin toplanmasını dijitalleştirin.
        </Text>
        <Text style={styles.text}>Hesabınıza giriş yapın.</Text>
        <View style={styles.form}>
          {blockDate !== '' && (
            <Text style={styles.blockText}>
              Giriş yapmanız engellenmiştir, Şu saatten sonra tekrar deneyiniz;
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
            placeholder="Şifre"
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
                <Text style={{color: '#fff', fontSize: 20}}>Giriş Yap</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default LoginScreen;
