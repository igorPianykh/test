import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles.ts';
import MainButton from '../../../components/MainButton';
import { deviceTypes } from '../utils.ts';
import screenNames from '../../../navigation/screenNames.ts';
import { titles } from '../../../utils/constants.ts';
import { PageLayout } from '../../../components';
import { DeviceContext } from '../../../context/deviceContext.tsx';

const DeviceInfo: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { device } = useContext(DeviceContext);

  const goToDeviceSearchScreen = () => {
    navigation.navigate(screenNames.DeviceConnection);
  };

  const isQardioArm1 = device.id === deviceTypes[0].id;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <PageLayout title={titles.device} onPressBack={goBack}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            {`${
              isQardioArm1
                ? 'Turn on your QardioArm'
                : 'Turn on your QardioArm 2 to begin the onboarding process'
            }`}
          </Text>
          <View style={styles.content}>
            {!isQardioArm1 && (
              <View style={styles.descriptionContainer}>
                <Ionicon name="lightbulb-on" size={38} color="green" />
                <Text style={styles.descriptionText}>
                  Plug your device using charge cable for 5 seconds to wake it
                  up.
                </Text>
              </View>
            )}
            <View>
              <View style={styles.guideContainer}>
                <Ionicon
                  name="checkbox-marked-circle-outline"
                  size={26}
                  color="green"
                />
                <Text style={styles.guideText}>
                  Unroll the cuff and pull the tab to automatically activate
                  your QardioArm.
                </Text>
              </View>
              <View style={styles.guideContainer}>
                <Ionicon
                  name="checkbox-marked-circle-outline"
                  size={26}
                  color="green"
                />
                <Text style={styles.guideText}>
                  Place your left arm through the cuff and position the
                  QardioArm on your upper arm.
                </Text>
              </View>
              <View style={styles.guideContainer}>
                <Ionicon
                  name="checkbox-marked-circle-outline"
                  size={26}
                  color="green"
                />
                <Text style={styles.guideText}>
                  Fix the cuff comfortably, not too tight, ensuring that the
                  Qardio logo faces downward on the inside of your arm.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <MainButton
            onPress={goToDeviceSearchScreen}
            buttonText="Start Search"
          />
        </View>
      </SafeAreaView>
    </PageLayout>
  );
};

export default DeviceInfo;
