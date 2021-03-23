import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ForgotPassword from '../../screens/ForgotPassword';
import ResetPassword from '../../screens/ResetPassword';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
