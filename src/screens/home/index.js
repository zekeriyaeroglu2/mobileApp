import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const [user, setUser] = useState(); //JSON.parse(route.params.userInfo);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //AsyncStorage.removeItem('userData');
    //getUserLoginTryCount();
    const getUser = () => {
      AsyncStorage.getItem('userData').then(userData => {
        let parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(false);
      });
    };

    getUser();
  }, []);

  const userLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('login');
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('start');
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
