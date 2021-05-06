import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Context from '../../context/store';
import styles from './style';

const HomeScreen = ({route, navigation}) => {
  const data = JSON.parse(route.params.data);
  return (
    <View style={styles.container}>
      <Text>FileUpload </Text>
      <Text>{data.refID} </Text>
      <Text>{data.refType} </Text>
    </View>
  );
};

export default HomeScreen;
