import { RouteProp } from '@react-navigation/native';
import screenNames from './screenNames';

export type RootStackParamList = {
  [screenNames.AUTH_STACK]: undefined;
  [screenNames.MAIN_STACK]: undefined;
  [screenNames.SignIn]: undefined;
  [screenNames.SignUp]: undefined;
  [screenNames.HOME_STACK]: undefined;
  [screenNames.Timeline]: undefined;
  [screenNames.Profile]: undefined;
  [screenNames.Home]: undefined;
};

export interface ScreenOptionsProps {
  route: RouteProp<RootStackParamList>;
  navigation: any;
}

export interface Route<T = {}> {
  key: string;
  name: string;
  params: T;
}
