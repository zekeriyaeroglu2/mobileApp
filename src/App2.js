import 'react-native-gesture-handler';
import * as React from 'react';
import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FlashMessage from 'react-native-flash-message';

import StartScreen from './screens/start';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';

//global
global.API_URL = 'http://192.168.1.22/proapp';

const Stack = createStackNavigator();

const App: Node = () => {
  return (
    <NavigationContainer initialRouteName="start">
      <Stack.Navigator>
        <Stack.Screen
          name="start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          //options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          //options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};
export default App;
