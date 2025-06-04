import React, { useContext, useEffect } from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';
import { DB } from '@op-engineering/op-sqlite';
import { useToast } from '@gluestack-ui/themed';
import screenNames from './screenNames';
import { RootStackParamList } from './entities';
import { screenOptions } from './utils';
import { white } from '../assets/colors';
import MainStack from './Stacks/MainStack';
import AuthStack from './Stacks/AuthStack';
import { UserContext } from '../context/userContext.tsx';
import { loginUserTransaction } from '../services/database';
import { DatabaseContext } from '../../App.tsx';

const Stack = createStackNavigator();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: any, params: object = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: white,
  },
};

const Navigation: React.FC = () => {
  const db = useContext(DatabaseContext) as DB | null;
  const { setUser } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (db) {
        try {
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
            loginUserTransaction(
              db,
              { email: credentials.username, password: credentials.password },
              toast,
              setUser,
            );
          }
        } catch (error) {}
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  const { user } = useContext(UserContext);
  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      <Stack.Navigator
        // screenOptions={Header}
        initialRouteName={
          user ? screenNames.MAIN_STACK : screenNames.AUTH_STACK
        }>
        {user ? (
          <Stack.Screen
            name={screenNames.MAIN_STACK}
            component={MainStack}
            options={screenOptions}
          />
        ) : (
          <Stack.Screen
            name={screenNames.AUTH_STACK}
            component={AuthStack}
            options={screenOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
