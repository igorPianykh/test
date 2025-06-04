import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../../screenNames';
import { screenOptions } from '../../utils';
import Home from '../../../screens/Home';
import BleDeviceConnection from '../../../screens/Home/DeviceConnection';
import ChooseDevice from '../../../screens/Home/ChooseDevice';
import DeviceInfo from '../../../screens/Home/DeviceInfo';
import BPMeasurements from '../../../screens/Home/BPMeasurements';
import MeasurementError from '../../../screens/Home/BPMeasurements/MeasurementError';
import { DeviceProvider } from '../../../context/deviceContext.tsx';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <DeviceProvider>
      <Stack.Navigator initialRouteName={screenNames.Home}>
        <Stack.Screen
          name={screenNames.Home}
          component={Home}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.DeviceConnection}
          component={BleDeviceConnection}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.ChooseDevice}
          component={ChooseDevice}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.DeviceInfo}
          component={DeviceInfo}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.BPMeasurements}
          component={BPMeasurements}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.MeasuringError}
          component={MeasurementError}
          options={screenOptions}
        />
      </Stack.Navigator>
    </DeviceProvider>
  );
};

export default HomeStack;
