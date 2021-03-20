import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Hairdresser from '../../../../screens/Hairdresser';
import CreateAppointment from '../../../../screens/CreateAppointment';
import AppointmentCreated from '../../../../screens/AppointmentCreated';

export type StackParamList = {
  Hairdresser: undefined,
  CreateAppointment: undefined,
  AppointmentCreated: undefined,
}

const HairdresserStack = createStackNavigator<StackParamList>();

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
  </HairdresserStack.Navigator>
);

export default HairdresserRoutes;
