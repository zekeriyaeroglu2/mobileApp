import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/home';
import AccountScreen from '../screens/account';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          console.log(route.name);
          if (route.name === 'Anasayfa') {
            iconName = 'home';
          } else if (route.name === 'Hesap') {
            iconName = 'bars';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        showIcon: true,
        showLabel: false,
      }}>
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen
        name="Hesap"
        options={{title: 'Hesap'}}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}
