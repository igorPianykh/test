import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { FormikValues } from 'formik';
import styles from './styles.ts';
import { lightGray, primaryGreen } from '../../assets/colors.ts';

interface Props extends TextInputProps {
  label?: string;
  touched?: boolean | FormikValues;
  error?: string;
}

const MainInput: React.FC<Props> = ({
  label,
  touched,
  error,
  ...nativeInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label(error && touched)}>{label}</Text>
      <TextInput
        placeholderTextColor={lightGray}
        autoCapitalize="none"
        selectionColor={primaryGreen}
        style={styles.input(error && touched)}
        textContentType="oneTimeCode"
        {...nativeInputProps}
      />
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default MainInput;
