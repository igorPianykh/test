import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenNames from '../../screenNames';
import HomeStack from '../HomeStack';
import { Profile, Timeline } from '../../../screens';
import { getTabBarIcon, screenOptions } from '../../utils.tsx';
import { primaryGray, primaryGreen } from '../../../assets/colors.ts';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenNames.Home}
      screenOptions={({ route }: any) => ({
        ...screenOptions,
        tabBarIcon: ({ color, size, focused }) => {
          return getTabBarIcon(size, color, focused, route.name);
        },
        tabBarActiveTintColor: primaryGreen,
        tabBarInactiveTintColor: primaryGray,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: Platform.OS === 'android' && {
          marginBottom: 10,
        },
      })}>
      <Tab.Screen name={screenNames.HOME_STACK} component={HomeStack} />
      <Tab.Screen name={screenNames.Timeline} component={Timeline} />
      <Tab.Screen name={screenNames.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default Navigation;
