import React, { useContext } from 'react';
import { View, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { DB } from '@op-engineering/op-sqlite';
import { useToast } from '@gluestack-ui/themed';
import styles from './styles.ts';
import { MainButton, MainInput, PageLayout } from '../../components';
import { titles } from '../../utils/constants.ts';
import { signUpFormReviewSchema } from './utils.ts';
import { DatabaseContext } from '../../../App.tsx';
import { registerUserTransaction } from '../../services/database';
import { UserContext } from '../../context/userContext.tsx';

export const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { setUser } = useContext(UserContext);
  const db = useContext(DatabaseContext) as DB | null;

  const toast = useToast();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmitForm = (values: typeof initialValues) => {
    if (db) {
      registerUserTransaction(db, values, toast, setUser);
    }
  };

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <PageLayout
      title={titles.createAccount}
      onPress={handleTouchOutside}
      onPressBack={handleGoBack}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpFormReviewSchema}
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
                placeholder={titles.enterName}
                label={titles.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                touched={touched.name}
                error={errors.name}
              />
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
            </View>
            <View style={styles.bottomContainer}>
              <MainButton
                onPress={handleSubmit}
                buttonText={titles.register}
                disabled={
                  Object.keys(errors).length !== 0 ||
                  (!values.email && !values.password && !values.name)
                }
              />
            </View>
          </View>
        )}
      </Formik>
    </PageLayout>
  );
};

export default SignUp;
