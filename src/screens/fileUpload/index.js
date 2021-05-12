import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import Context from '../../context/store';
import generalStyle from '../../styles/general';
import styles from './style';

import fileAPI from '../../services/api/file';

const HomeScreen = ({route, navigation}) => {
  const data = JSON.parse(route.params.data);
  const [loading, setloading] = useState(true);

  const {state, dispatch} = useContext(Context);
  useEffect(() => {
    const getRefInfo = () => {
      fileAPI.RefInfo({
        refID: data.refID,
        refType: data.refType,
        email: state.userEmail,
        token: state.token,
        customerCode: state.customerCode,
      });
    };

    getRefInfo();

    setloading(false);
    return () => {
      setloading;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    <View style={generalStyle.loader}>
      <ActivityIndicator size="large" color="#000" />
    </View>;
  }
  return (
    <View style={styles.container}>
      <Text>FileUpload </Text>
      <Text>{data.refID} </Text>
      <Text>{data.refType} </Text>
    </View>
  );
};

export default HomeScreen;
