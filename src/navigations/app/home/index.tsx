import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HairdresserScreen from './hairdresser';
import AppointmentScreen from '../../../screens/Appointment';

const HomeBottomTab = createBottomTabNavigator();

const bottomTabItemConfig = {
  activeBackgroundColor: '#3e3b47',
  activeTintColor: '#ff9000',
  inactiveBackgroundColor: '#3e3b47',
  inactiveTintColor: '#999591',
  labelStyle: {
    fontFamily: 'RobotoSlab-Regular',
  },
};

const HomeRoutes: React.FC = () => (
  <HomeBottomTab.Navigator
    initialRouteName="Hairdressers"
    tabBarOptions={bottomTabItemConfig}
  >
    <HomeBottomTab.Screen
      name="Hairdressers"
      component={HairdresserScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon
          size={size}
          color={color}
          name={'meh'} />
      }}
    />
    <HomeBottomTab.Screen
      name="Appointments"
      component={AppointmentScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon
          size={size}
          color={color}
          name={'layers'} />
      }}
    />
  </HomeBottomTab.Navigator>
);

export default HomeRoutes;