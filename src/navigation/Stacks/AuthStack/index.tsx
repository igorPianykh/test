import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../../screenNames';
import { SignIn, SignUp } from '../../../screens';
import { screenOptions } from '../../utils';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.SignIn}>
      <Stack.Screen
        name={screenNames.SignIn}
        component={SignIn}
        options={screenOptions}
      />
      <Stack.Screen
        name={screenNames.SignUp}
        component={SignUp}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
