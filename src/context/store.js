import {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
  customerCode: AsyncStorage.getItem('customerCode')
    ? AsyncStorage.getItem('customerCode')
    : '',
  token: AsyncStorage.getItem('token') ? AsyncStorage.getItem('token') : '',
  userEmail: AsyncStorage.getItem('userEmail')
    ? AsyncStorage.getItem('userEmail')
    : '',
};

// eslint-disable-next-line no-undef
export default Context = createContext(initialState);
