import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../../context/store';
import styles from './style';

const AccountScreen = ({route, navigation}) => {
  const [user, setUser] = useState(); //JSON.parse(route.params.userInfo);
  const [loading, setLoading] = useState(true);

  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    //AsyncStorage.clear();
    //getUserLoginTryCount();
    const getUser = () => {
      AsyncStorage.getItem('userData').then(userData => {
        if (userData) {
          let parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setLoading(false);
        }
      });
    };

    getUser();
  }, []);

  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
      dispatch({type: 'TOKEN', token: ''});
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({type: 'TOKEN', token: ''});
    dispatch({type: 'CUSTOMER_CODE', customerCode: ''});
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
    <View>
      <Text> Adı Soyadı: {user.userName} </Text>
      <Text> E-Posta: {user.userEmail}</Text>
      <Text> Kullanıcı Grubu: {user.groupName}</Text>
      <Text onPress={userLogout}>Kullanıcı Hesabından Çıkış Yap</Text>
      <Text onPress={logout}>Müşteri değiştir</Text>
    </View>
  );
};

export default AccountScreen;
