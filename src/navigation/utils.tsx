import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import screenNames from './screenNames.ts';

export const screenOptions = {
  headerShown: false,
};

export const getTabBarIcon = (
  size: number,
  color: string,
  focused: boolean,
  routeName: string,
) => {
  switch (routeName) {
    case screenNames.HOME_STACK:
      return (
        <Ionicon
          name={focused ? 'home' : 'home-outline'}
          size={size}
          color={color}
        />
      );
    case screenNames.Timeline:
      return <Ionicon name="hourglass-outline" size={size} color={color} />;
    case screenNames.Profile:
      return (
        <Ionicon
          name={focused ? 'person' : 'person-outline'}
          size={size}
          color={color}
        />
      );
  }
};
