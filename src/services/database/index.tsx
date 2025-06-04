import React from 'react';
import uuid from 'react-native-uuid';
import { DB } from '@op-engineering/op-sqlite';
import BcryptReactNative from 'bcrypt-react-native';
import * as Keychain from 'react-native-keychain';
import { initialValues } from '../../screens/SignUp';
import { initialValues as loginInitialValues } from '../../screens/SignIn';
import { navigate } from '../../navigation';
import screenNames from '../../navigation/screenNames.ts';
import { errorTitles, titles } from '../../utils/constants.ts';
import Toast from '../../components/Toast';
import {
  insertMeasurementQuery,
  insertRegistrationQuery,
  selectByEmailQuery,
  selectMeasurementsQuery,
} from './queries.ts';
import { ToastService, UserType } from '../../screens/SignIn/entities.ts';

export const registerUserTransaction = async (
  db: DB,
  values: typeof initialValues,
  toast: ToastService,
  setUser: React.Dispatch<React.SetStateAction<UserType>>,
) => {
  try {
    const { rows } = await db.execute(selectByEmailQuery, [values.email]);
    if (rows && rows.length > 0) {
      toast.show({
        placement: 'bottom',
        render: () => {
          return <Toast text={errorTitles.userAlreadyExist} action="error" />;
        },
      });
    } else {
      const uniqueId = uuid.v4();
      const salt = await BcryptReactNative.getSalt(10);
      const hashedPassword = await BcryptReactNative.hash(
        salt,
        values.password,
      );
      db.execute(insertRegistrationQuery, [
        uniqueId,
        values.name,
        values.email,
        hashedPassword,
      ]);
      setUser({
        id: uniqueId.toString(),
        name: values.name,
        email: values.email,
      });
      await Keychain.setGenericPassword(values.email, values.password);
      navigate(screenNames.MAIN_STACK);
      toast.show({
        placement: 'bottom',
        render: () => {
          return <Toast text={titles.accountCreated} action="success" />;
        },
      });
    }
  } catch (e) {
    toast.show({
      placement: 'bottom',
      render: () => {
        return <Toast text={errorTitles.failedCreateAccount} action="error" />;
      },
    });
  }
};

export const loginUserTransaction = async (
  db: DB,
  values: typeof loginInitialValues,
  toast: ToastService,
  setUser: React.Dispatch<React.SetStateAction<UserType>>,
) => {
  try {
    const { rows } = await db.execute(selectByEmailQuery, [values.email]);

    if (rows && rows.length > 0) {
      const user = rows[0];
      const passwordMatch = await BcryptReactNative.compareSync(
        values.password,
        user.password,
      );
      if (passwordMatch) {
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
        });
        await Keychain.setGenericPassword(user.email, values.password);
        navigate(screenNames.MAIN_STACK);
      } else {
        toast.show({
          placement: 'bottom',
          render: () => {
            return <Toast text={errorTitles.invalidSignIn} action="error" />;
          },
        });
      }
    } else {
      toast.show({
        placement: 'bottom',
        render: () => {
          return <Toast text={errorTitles.invalidSignIn} action="error" />;
        },
      });
    }
  } catch (e) {
    toast.show({
      placement: 'bottom',
      render: () => {
        return <Toast text={errorTitles.failedSignIn} action="error" />;
      },
    });
  }
};

export const addMeasurement = async (
  db: DB,
  userId: string,
  measurements: { sys: number; dia: number; pulse: number; timestamp: string },
  toast: ToastService,
) => {
  const id = uuid.v4();

  try {
    await db.execute(insertMeasurementQuery, [
      id,
      userId,
      measurements.sys,
      measurements.dia,
      measurements.pulse,
      measurements.timestamp,
    ]);
    toast.show({
      placement: 'bottom',
      render: () => {
        return <Toast text={titles.measurement} action="success" />;
      },
    });
  } catch (error) {
    toast.show({
      placement: 'bottom',
      render: () => {
        return <Toast text={errorTitles.measurement} action="error" />;
      },
    });
  }
};

export const getMeasurementsForUser = async (db: DB, userId: string) => {
  try {
    const { rows } = await db.execute(selectMeasurementsQuery, [userId]);
    return rows; // Array of measurement records
  } catch (error) {
    console.error('Error fetching measurements:', error);
    return [];
  }
};
