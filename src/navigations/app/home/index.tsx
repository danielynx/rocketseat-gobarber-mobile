import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import HairdresserScreen from './hairdressers';
import AppointmentScreen from '../../../screens/Appointment';

export type BottomTabParamList = {
  Hairdressers: undefined,
  Appointments: undefined,
}

const HomeBottomTab = createBottomTabNavigator<BottomTabParamList>();

const HomeRoutes: React.FC = () => {
  return (
    <HomeBottomTab.Navigator
      initialRouteName="Hairdressers"
      tabBarOptions={{
        activeBackgroundColor: '#3e3b47',
        activeTintColor: '#ff9000',
        inactiveBackgroundColor: '#3e3b47',
        inactiveTintColor: '#999591',
        labelPosition: 'beside-icon',
        labelStyle: {
          fontFamily: 'RobotoSlab-Regular',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: '#312e38',
      }}
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
    </HomeBottomTab.Navigator >
  );
};

export default HomeRoutes;
