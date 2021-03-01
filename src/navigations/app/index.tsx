import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './home';
import DetailScreen from '../../screens/Detail';

const AppDrawer = createDrawerNavigator();

const AppRoutes: React.FC = () => (
  <AppDrawer.Navigator initialRouteName="Home"
    drawerContentOptions={{
      style: {
        backgroundColor: '#312e38'
      },
      activeBackgroundColor: '#3e3b47',
      activeTintColor: '#ff9000',
      inactiveBackgroundColor: '#3e3b47',
      inactiveTintColor: '#999591',
      labelStyle: {
        fontFamily: 'RobotoSlab-Regular',
      },
    }}
  >
    <AppDrawer.Screen name="Home" component={HomeScreen} />
    <AppDrawer.Screen name="Detail" component={DetailScreen} />
  </AppDrawer.Navigator >
);

export default AppRoutes;
