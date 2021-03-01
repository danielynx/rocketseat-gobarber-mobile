import 'react-native-gesture-handler';

import * as Sentry from "@sentry/react-native";
import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './hooks';

import Navigations from './navigations';

if (!__DEV__) {
  Sentry.init({
    dsn: "https://073b1f98db4449e791241e78de3bb744@o299472.ingest.sentry.io/5567686",
  });
}

const App: React.FC = () => {

  useEffect(() => {
    // To do something before the app started
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" translucent />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Navigations />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
