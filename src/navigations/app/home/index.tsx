import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HairdresserScreen from './hairdresser';
// import AppointmentScreen from './appointment';

const HomeBottomTabs = createBottomTabNavigator();

const HomeRoutes: React.FC = () => (
  <HomeBottomTabs.Navigator initialRouteName="Hairdresser">
    <HomeBottomTabs.Screen name="Hairdresser" component={HairdresserScreen} />
    {/* <HomeBottomTabs.Screen name="Appointment" component={AppointmentScreen} /> */}
  </HomeBottomTabs.Navigator>
);

export default HomeRoutes;
