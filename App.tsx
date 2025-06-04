import './gesture-handler';
import React, { createContext, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { GluestackUIProvider, useToast } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { InitBleManager } from 'qardioBluetooth';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Navigation from './src/navigation/index';
import { DatabaseContextType } from './src/screens/SignIn/entities.ts';
import { useSqlite } from './src/hooks/useSqlite.ts';
import { UserProvider } from './src/context/userContext.tsx';
import Toast from './src/components/Toast';
import { errorTitles } from './src/utils/constants.ts';

export const DatabaseContext = createContext<DatabaseContextType>(null);

const App = () => {
  const db = useSqlite();
  const toast = useToast();

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 31) {
          // Android 12+ Permissions
          const scanPermission = await request(
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          );
          const connectPermission = await request(
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          );
          if (
            scanPermission === RESULTS.GRANTED &&
            connectPermission === RESULTS.GRANTED
          ) {
            console.log('Bluetooth permissions granted');
          } else {
            toast.show({
              placement: 'bottom',
              render: () => {
                return (
                  <Toast
                    text={errorTitles.failedBluetoothPermission}
                    action="error"
                  />
                );
              },
            });
            console.log('Bluetooth permissions denied');
          }
        } else {
          // Pre-Android 12 permissions
          const fineLocation = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'App needs location permission to access Bluetooth devices',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (fineLocation === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
          } else {
            toast.show({
              placement: 'bottom',
              render: () => {
                return (
                  <Toast
                    text={errorTitles.failedLocationPermission}
                    action="error"
                  />
                );
              },
            });
            console.log('Location permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    InitBleManager();
    requestBluetoothPermissions();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <DatabaseContext.Provider value={db}>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </DatabaseContext.Provider>
    </GluestackUIProvider>
  );
};

export default App;
