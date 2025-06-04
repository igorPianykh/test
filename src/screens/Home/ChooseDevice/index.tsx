import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles.ts';
import MainButton from '../../../components/MainButton';
import screenNames from '../../../navigation/screenNames.ts';
import { deviceTypes } from '../utils.ts';
import { primaryGreen } from '../../../assets/colors.ts';
import { titles } from '../../../utils/constants.ts';
import { PageLayout } from '../../../components';
import { DeviceContext } from '../../../context/deviceContext.tsx';

const ChooseDevice: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { device, setDevice } = useContext(DeviceContext);

  const handleSelect = (id: string) => {
    setDevice({ id });
  };

  const selectDeviceModel = () => {
    navigation.navigate(screenNames.DeviceInfo);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <PageLayout title={titles.chooseDevice} onPressBack={goBack}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Choose your QardioArm</Text>
          </View>
          <View style={styles.itemsContainer}>
            {deviceTypes.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => handleSelect(item.id)}>
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.label}</Text>
                  <Text style={styles.itemDescriptionText}>
                    {item.description}
                  </Text>
                </View>
                {device?.id === item.id && (
                  <Ionicon name="checkmark" size={24} color={primaryGreen} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <MainButton
            onPress={selectDeviceModel}
            buttonText="Select Device"
            disabled={!device}
          />
        </View>
      </SafeAreaView>
    </PageLayout>
  );
};

export default ChooseDevice;
