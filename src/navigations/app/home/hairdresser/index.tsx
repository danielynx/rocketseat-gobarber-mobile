import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Hairdresser from '../../../../screens/Hairdresser';
import Profile from '../../../../screens/Profile';
import CreateAppointment from '../../../../screens/CreateAppointment';
import AppointmentCreated from '../../../../screens/AppointmentCreated';

const HairdresserStack = createStackNavigator();

const HairdresserRoutes: React.FC = () => (
  <HairdresserStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <HairdresserStack.Screen name="Hairdresser" component={Hairdresser} />
    <HairdresserStack.Screen name="CreateAppointment" component={CreateAppointment} />
    <HairdresserStack.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <HairdresserStack.Screen name="Profile" component={Profile} />
  </HairdresserStack.Navigator>
);

export default HairdresserRoutes;
