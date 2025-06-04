import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { View } from '@gluestack-ui/themed';
import {
  BleManagerConnectPeripheral,
  BleManagerDiscoverPeripheral,
  BleManagerStopScan,
  ConnectToBleDevice,
  RemoveAllListeners,
  StartBluetoothScan,
  PeripheralInfo,
  StopBluetoothScan,
  QARDIO_DEVICES,
} from 'qardioBluetooth';
import * as Progress from 'react-native-progress';
import Ionicon from 'react-native-vector-icons/MaterialIcons.js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BleError, SetStateError } from '../types.ts';
import styles from './styles.ts';
import { primaryGreen } from '../../../assets/colors.ts';
import MainButton from '../../../components/MainButton';
import screenNames from '../../../navigation/screenNames.ts';
import { titles } from '../../../utils/constants.ts';
import { PageLayout } from '../../../components';
import { DeviceContext } from '../../../context/deviceContext.tsx';
import { deviceTypes } from '../utils.ts';

const WIDTH = Dimensions.get('window').width * 0.8;

const BleDeviceConnection = () => {
  const [connectedPeripheral, setConnectedPeripheral] =
    useState<PeripheralInfo | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<SetStateError>(null);
  const [foundPeripheral, setFoundPeripheral] = useState<PeripheralInfo | null>(
    null,
  );

  const [progress, setProgress] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { device } = useContext(DeviceContext);

  const handleDiscoverPeripheral = (peripheral: PeripheralInfo) => {
    if (peripheral.advertising?.isConnectable) {
      if (
        device.id === deviceTypes[0].id &&
        (peripheral.id === QARDIO_DEVICES.QARDIO_ARM_ID_IOS ||
          peripheral.id === QARDIO_DEVICES.QARDIO_ARM_ID_ANDROID)
      ) {
        setFoundPeripheral(peripheral);
      } else if (
        device.id === deviceTypes[1].id &&
        (peripheral.id === QARDIO_DEVICES.QARDIO_ARM2_ID_IOS ||
          peripheral.id === QARDIO_DEVICES.QARDIO_ARM2_ID_ANDROID)
      ) {
        setFoundPeripheral(peripheral);
      }
    }
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  const handleConnectPeripheral = () => {
    setConnecting(false);
  };

  const onScanResult = () => {
    setScanning(true);
  };
  const onScanError = (err: BleError) => {
    setError(err.message);
    console.error(err);
  };

  const onStopScanResult = () => {
    setScanning(false);
  };
  const onStopScanError = (err: BleError) => {
    setError(err.message);
    console.error(err);
  };

  const retrieveDeviceInfo = (peripheralInfo: PeripheralInfo) => {
    setConnectedPeripheral(peripheralInfo);
  };

  const onRetrieveDeviceInfoError = (err: BleError) => {
    setError(err.message);
  };

  const onDeviceConnectError = (err: BleError) => {
    setError(err.message);
  };

  useEffect(() => {
    BleManagerDiscoverPeripheral(handleDiscoverPeripheral);
    BleManagerStopScan(handleStopScan);
    BleManagerConnectPeripheral(handleConnectPeripheral);
    return () => {
      RemoveAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scanDevices = async () => {
    StartBluetoothScan(scanning, onScanResult, onScanError);

    let scanDuration = 5000; // 5 seconds scan duration
    let interval = 100; // Update every 100ms
    let increments = scanDuration / interval;
    let incrementValue = 1 / increments;

    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          clearInterval(progressInterval);
          StopBluetoothScan(onStopScanResult, onStopScanError);
          return 1;
        }
        return prevProgress + incrementValue;
      });
    }, interval);
  };

  const connectToDevice = () => {
    if (foundPeripheral) {
      setConnecting(true);
      setTimeout(
        () =>
          ConnectToBleDevice(
            foundPeripheral.id,
            retrieveDeviceInfo,
            onRetrieveDeviceInfoError,
            onDeviceConnectError,
          ),
        5000,
      );
    }
  };

  const goToHome = () => {
    navigation.navigate(screenNames.Home);
  };

  useEffect(() => {
    scanDevices();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!connecting && connectedPeripheral) {
      navigation.navigate(screenNames.BPMeasurements, {
        connectedPeripheral,
      });
    }
  }, [connectedPeripheral, connecting, navigation]);

  return (
    <PageLayout title={titles.device} onPressBack={goToHome}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicon
              name={!connecting ? 'bluetooth-searching' : 'bluetooth-connected'}
              size={64}
              color={primaryGreen}
            />
          </View>
          <View style={styles.progressText(WIDTH)}>
            {scanning && (
              <Text style={styles.text}>Searching QardioArm...</Text>
            )}
            {!scanning && !connecting && (
              <Text style={styles.text}>
                {foundPeripheral
                  ? 'Device found. Connect to continue.'
                  : 'Device not found. Please, check if Bluetooth is enabled and try again.'}
              </Text>
            )}
            {!scanning && error && (
              <Text style={styles.text}>
                Error while searching device. Please, check if Bluetooth is
                enabled and try again.
              </Text>
            )}
            {!scanning && connecting && (
              <Text style={styles.text}>Connecting to device...</Text>
            )}
          </View>
          <Progress.Bar
            style={styles.progress}
            width={WIDTH}
            height={10}
            progress={progress}
            indeterminate={connecting}
            color={primaryGreen}
            borderColor={primaryGreen}
          />
        </View>
        <View style={styles.bottomContainer}>
          {!scanning && (
            <MainButton
              onPress={foundPeripheral ? connectToDevice : goToHome}
              buttonText={foundPeripheral ? 'Connect to Device' : 'Start again'}
              disabled={connecting}
            />
          )}
        </View>
      </SafeAreaView>
    </PageLayout>
  );
};

export default BleDeviceConnection;
