import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../../context/store';
import styles from './style';

const HomeScreen = ({route, navigation}) => {
  const [user, setUser] = useState(); //JSON.parse(route.params.userInfo);
  const [loading, setLoading] = useState(true);

  const {state, dispatch} = useContext(Context);

  return (
    <View style={styles.container}>
      <Text>Anasayfa </Text>
      <TouchableOpacity onPress={() => navigation.navigate('qrscanner')}>
        <Text>asdasds</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
