import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BleCheckState,
  BleManagerDidUpdateState,
  RemoveAllListeners,
} from 'qardioBluetooth';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles.ts';
import screenNames from '../../navigation/screenNames.ts';
import { titles } from '../../utils/constants.ts';
import { PageLayout } from '../../components';
import { DeviceContext } from '../../context/deviceContext.tsx';
import { white } from '../../assets/colors.ts';
import { BleState } from './types.ts';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { setDevice } = useContext(DeviceContext);
  const [bluetoothState, setBluetoothState] = useState('');

  const goToDeviceConnection = () => {
    navigation.navigate(screenNames.ChooseDevice);
  };

  const handleUpdateState = (args: BleState['args']) => {
    setBluetoothState(args.state);
  };

  const checkState = (value: string) => {
    setBluetoothState(value);
  };

  useFocusEffect(() => {
    setDevice(null);
    BleCheckState(checkState);

    BleManagerDidUpdateState(handleUpdateState);

    return () => {
      RemoveAllListeners();
    };
  });

  return (
    <PageLayout title={titles.home}>
      <View style={styles.container}>
        {bluetoothState === 'off' && (
          <View style={styles.bannerContainer}>
            <Ionicon name="bluetooth-off" size={22} color={white} />
            <Text style={styles.bannerText}>
              Bluetooth is disabled. Please, turn on Bluetooth to use device.
            </Text>
          </View>
        )}
        <View style={styles.content}>
          <TouchableOpacity
            onPress={goToDeviceConnection}
            style={styles.startButton}>
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageLayout>
  );
};

export default Home;
