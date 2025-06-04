import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import {
  BleManagerDidUpdateValueForCharacteristic,
  BleManagerDisconnectPeripheral,
  RemoveAllListeners,
  startMeasurement,
  stopMeasurement,
  subscribeToNotifyBPMeasurement,
  unsubscribeFromNotifyBPMeasurement,
  PeripheralInfo,
  DisconnectFromBleDevice,
  areValuesValid,
} from 'qardioBluetooth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DB } from '@op-engineering/op-sqlite';
import { useToast } from '@gluestack-ui/themed';
import { get, isNull } from 'lodash';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles.ts';
import MainButton from '../../../components/MainButton';
import { BleError, BPState, SetStateError, ValueFromNotify } from '../types.ts';
import { errorTypes, getCurrentDateTime } from '../utils.ts';
import { addMeasurement } from '../../../services/database';
import { DatabaseContext } from '../../../../App.tsx';
import { UserContext } from '../../../context/userContext.tsx';
import ScreenNames from '../../../navigation/screenNames.ts';
import { titles } from '../../../utils/constants.ts';
import { PageLayout } from '../../../components';
import screenNames from '../../../navigation/screenNames.ts';
import MeasurementCard from './MeasurementCard';
import { primaryGreen } from '../../../assets/colors.ts';

type RouteParams = {
  Params: { connectedPeripheral: PeripheralInfo };
};

const BPMeasurements: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'Params'>>();
  const db = useContext(DatabaseContext) as DB;
  const { user } = useContext(UserContext);
  const toast = useToast();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { connectedPeripheral } = route.params;

  const [bpMeasurements, setBpMeasurements] = useState({
    sys: 0,
    dia: 0,
    pulse: 0,
    timestamp: '',
  });
  const [error, setError] = useState<SetStateError>(null);
  const [measuring, setMeasuring] = useState<BPState | null>(null);
  const [peripheral, setPeripheral] =
    useState<PeripheralInfo>(connectedPeripheral);

  const [connectionStatus, setConnectionStatus] = useState(true);

  const retrieveDeviceInfo = (peripheralInfo: PeripheralInfo) => {
    console.log('retrieveDeviceInfo ---> ', peripheralInfo);
    setPeripheral(peripheralInfo);
  };
  const onRetrieveDeviceInfoError = (err: BleError) => {
    console.log('Error retrieving --->', err);
    setError(err.message);
  };

  const onDeviceDisconnected = () => {
    console.log('Device disconnected');
    setPeripheral(null);
  };
  const onDeviceDisconnectError = (err: BleError) => {
    console.log('Device disconnection error --->', err);
    setError(err.message);
  };

  const onWriteDeviceCharacteristic = (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    value: number[],
  ) => {
    setMeasuring({ inProgress: true });
    console.log(
      `Wrote value to ${id} - ${serviceUUID} - ${characteristicUUID}: ${value}`,
    );
  };

  const onWriteDeviceCharacteristicError = (err: BleError) => {
    console.log('Write error --->', err);
    setError(err.message);
  };

  const onSubscribeToNotify = (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => {
    console.log(`Subscribed to ${id} - ${serviceUUID} - ${characteristicUUID}`);
  };

  const onSubscribeError = (err: BleError) => {
    setError(err.message);
  };

  const onUnsubscribeFromNotify = (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => {
    console.log(
      `Unsubscribed from ${id} - ${serviceUUID} - ${characteristicUUID}`,
    );
  };

  const onUnsubscribeFromNotifyError = (err: BleError) => {
    setError(err.message);
  };

  const handleDisconnectPeripheral = () => {
    setPeripheral(null);
    setConnectionStatus(false);
    console.log('Listening disconnect');
  };

  const updateHealthData = (data: number[]) => {
    const timestamp = getCurrentDateTime();
    if (get(data, 0) !== 0) {
      setBpMeasurements(prevState => ({
        ...prevState,
        sys: data[1], // 2nd element -> sys
        dia: data[3], // 4th element -> dia
        pulse: data[7], // 8th element -> pulse
        timestamp,
      }));
      setMeasuring({ inProgress: false });
      disconnectFromDevice(peripheral);
    } else {
      setBpMeasurements(prevState => ({
        ...prevState,
        sys: data[1],
        timestamp,
      }));
    }
  };

  const handleUpdateValueForCharacteristic = ({
    value,
    peripheral,
    characteristic,
    service,
  }: ValueFromNotify) => {
    console.log(value);
    updateHealthData(value);
    console.log(
      `Received notification from ${service} - ${characteristic}: ${value}`,
    );
  };

  const disconnectFromDevice = (connectedDevice: PeripheralInfo) => {
    DisconnectFromBleDevice(
      connectedDevice,
      onDeviceDisconnected,
      onDeviceDisconnectError,
    );
  };

  const bPMeasurement = () => {
    subscribeToNotifyBPMeasurement(
      peripheral,
      retrieveDeviceInfo,
      onRetrieveDeviceInfoError,
      onSubscribeToNotify,
      onSubscribeError,
    );
    startMeasurement(
      peripheral,
      retrieveDeviceInfo,
      onRetrieveDeviceInfoError,
      onWriteDeviceCharacteristic,
      onWriteDeviceCharacteristicError,
    );
    setTimeout(() => {
      stopMeasurement(
        peripheral,
        retrieveDeviceInfo,
        onRetrieveDeviceInfoError,
        onWriteDeviceCharacteristic,
        onWriteDeviceCharacteristicError,
      );
      unsubscribeFromNotifyBPMeasurement(
        peripheral,
        retrieveDeviceInfo,
        onRetrieveDeviceInfoError,
        onUnsubscribeFromNotify,
        onUnsubscribeFromNotifyError,
      );
    }, 30000);
  };

  const cancelMeasuring = () => {
    setMeasuring({ inProgress: false });
    stopMeasurement(
      peripheral,
      retrieveDeviceInfo,
      onRetrieveDeviceInfoError,
      onWriteDeviceCharacteristic,
      onWriteDeviceCharacteristicError,
    );
    unsubscribeFromNotifyBPMeasurement(
      peripheral,
      retrieveDeviceInfo,
      onRetrieveDeviceInfoError,
      onUnsubscribeFromNotify,
      onUnsubscribeFromNotifyError,
    );
    disconnectFromDevice(peripheral);
  };

  const saveMeasurements = async () => {
    await addMeasurement(db, user!.id, bpMeasurements, toast);
    navigation.navigate(ScreenNames.Home);
  };

  useEffect(() => {
    BleManagerDisconnectPeripheral(handleDisconnectPeripheral);
    BleManagerDidUpdateValueForCharacteristic(
      handleUpdateValueForCharacteristic,
    );
    return () => {
      RemoveAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !isNull(measuring) &&
      !measuring.inProgress &&
      !areValuesValid(bpMeasurements)
    ) {
      navigation.navigate(ScreenNames.MeasuringError, {
        error: errorTypes.invalidMeasurements,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpMeasurements, measuring, peripheral]);

  useEffect(() => {
    if (!connectionStatus && measuring?.inProgress) {
      navigation.navigate(ScreenNames.MeasuringError, {
        error: errorTypes.deviceError,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus, measuring]);

  const goToHomeScreen = () => {
    if (peripheral) {
      disconnectFromDevice(peripheral);
    }
    navigation.navigate(screenNames.Home);
  };

  return (
    <PageLayout title={titles.measurementTitle} onPressBack={goToHomeScreen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Measure Blood Pressure</Text>
          <View style={styles.content}>
            <MeasurementCard {...bpMeasurements} />
            <View style={styles.content}>
              <View style={styles.descriptionContainer}>
                <Ionicon
                  name="information-outline"
                  size={26}
                  color={primaryGreen}
                />
                <Text style={styles.descriptionText}>
                  Keep your arm still and don't talk during the measurement
                  process.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {!measuring && (
            <MainButton
              onPress={bPMeasurement}
              buttonText="Start Measurement"
            />
          )}
          {measuring?.inProgress && (
            <MainButton onPress={cancelMeasuring} buttonText="Cancel" />
          )}
          {!isNull(measuring) &&
            !measuring.inProgress &&
            areValuesValid(bpMeasurements) && (
              <MainButton
                onPress={saveMeasurements}
                buttonText="Save Measurement"
              />
            )}
        </View>
      </SafeAreaView>
    </PageLayout>
  );
};

export default BPMeasurements;
