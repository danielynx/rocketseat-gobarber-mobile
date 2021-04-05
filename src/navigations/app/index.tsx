import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import HomeScreen from './home';
import ProfileScreen from '../../screens/Profile';
import AboutScreen from '../../screens/About';

export type DrawerParamList = {
  Home: undefined,
  Profile: undefined,
  About: undefined,
  Logout: undefined,
}

const AppDrawer = createDrawerNavigator<DrawerParamList>();

const drawerItemConfig = {
  activeBackgroundColor: '#3e3b47',
  activeTintColor: '#ff9000',
  inactiveBackgroundColor: '#3e3b47',
  inactiveTintColor: '#999591',
  labelStyle: {
    fontFamily: 'RobotoSlab-Regular',
  },
};

const AppRoutes: React.FC = () => {
  const { signOut } = useAuth();

  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <Icon
            size={size}
            color={color}
            name={'log-out'} />}
          onPress={() => signOut()}
          {...drawerItemConfig}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <AppDrawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#312e38',
        width: 200,
      }}
      drawerContentOptions={drawerItemConfig}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      sceneContainerStyle={{
        backgroundColor: '#312e38'
      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon
            size={size}
            color={color}
            name={'home'} />
        }}
      />
      <AppDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon
            size={size}
            color={color}
            name={'user'} />
        }}
      />
      <AppDrawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon
            size={size}
            color={color}
            name={'info'} />
        }}
      />
    </AppDrawer.Navigator >
  )
};

export default AppRoutes;
