import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles.ts';
import { primaryGreen } from '../../../../assets/colors.ts';
import screenNames from '../../../../navigation/screenNames.ts';
import { MainButton, PageLayout } from '../../../../components';
import { titles } from '../../../../utils/constants.ts';
import { MeasurementErrorRouteParams } from '../../types.ts';

const MeasurementError: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<MeasurementErrorRouteParams, 'Params'>>();
  const { error } = route.params;

  const goToHomeScreen = () => {
    navigation.navigate(screenNames.Home);
  };

  const goToDeviceScreen = () => {
    navigation.navigate(screenNames.ChooseDevice);
  };

  return (
    <PageLayout title={titles.measurementTitle} onPressBack={goToHomeScreen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{error.title}</Text>
          <View style={styles.content}>
            <View style={styles.descriptionContainer}>
              <Ionicon
                name="information-outline"
                size={38}
                color={primaryGreen}
              />
              <Text style={styles.descriptionText}>{error.message}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <MainButton
            onPress={goToDeviceScreen}
            buttonText="Start Measurement Again"
          />
        </View>
      </SafeAreaView>
    </PageLayout>
  );
};

export default MeasurementError;
