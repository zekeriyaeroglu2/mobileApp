import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from '@react-navigation/compat';

import FlashMessage from 'react-native-flash-message';

import StartScreen from '../screens/start';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import SplashScreen from '../screens/splash';

const Stack = createStackNavigator();

const StartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="start"
        component={StartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{title: 'Anasayfa'}}
        //options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SplashStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <SwitchStack />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const SwitchStack = createSwitchNavigator(
  {
    start: StartStack,
    login: LoginStack,
    home: HomeStack,
    splash: SplashStack,
  },
  {
    initialRouteName: 'splash',
  },
);

export default AppNavigation;
