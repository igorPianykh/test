import React, { useContext } from 'react';
import { View, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { DB } from '@op-engineering/op-sqlite';
import { useToast } from '@gluestack-ui/themed';
import screenNames from '../../navigation/screenNames.ts';
import styles from './styles.ts';
import { MainButton, MainInput, PageLayout } from '../../components';
import { titles } from '../../utils/constants.ts';
import { signInFormReviewSchema } from './utils.ts';
import { DatabaseContext } from '../../../App.tsx';
import { loginUserTransaction } from '../../services/database';
import { UserContext } from '../../context/userContext.tsx';

export const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const db = useContext(DatabaseContext) as DB | null;
  const { setUser } = useContext(UserContext);

  const toast = useToast();

  const navigateSignup = () => {
    navigation.navigate(screenNames.SignUp);
  };

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  const handleSubmitForm = (values: typeof initialValues) => {
    if (db) {
      loginUserTransaction(db, values, toast, setUser);
    }
  };

  return (
    <PageLayout title={titles.signIn} onPress={handleTouchOutside}>
      <Formik
        initialValues={initialValues}
        validationSchema={signInFormReviewSchema}
        onSubmit={handleSubmitForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.content}>
            <View style={styles.form}>
              <MainInput
                placeholder={titles.enterEmail}
                label={titles.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                touched={touched.email}
                error={errors.email}
                inputMode="email"
              />
              <MainInput
                placeholder={titles.enterPassword}
                label={titles.password}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                touched={touched.password}
                error={errors.password}
              />
              <MainButton
                onPress={handleSubmit}
                buttonText={titles.signIn}
                disabled={
                  Object.keys(errors).length !== 0 ||
                  (!values.email && !values.password)
                }
              />
            </View>
            <View style={styles.bottomContainer}>
              <MainButton
                onPress={navigateSignup}
                buttonText={titles.createAccount}
              />
            </View>
          </View>
        )}
      </Formik>
    </PageLayout>
  );
};

export default SignIn;
