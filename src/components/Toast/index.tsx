import React from 'react';
import {
  ToastTitle,
  VStack,
  Toast as GluestackToast,
} from '@gluestack-ui/themed';
import uuid from 'react-native-uuid';

interface Props {
  text: string;
  action: 'success' | 'error' | 'info';
}

const Toast: React.FC<Props> = ({ text, action }) => {
  const toastId = uuid.v4().toString();
  return (
    <GluestackToast nativeID={toastId} action={action} variant="solid">
      <VStack space="xs">
        <ToastTitle>{text}</ToastTitle>
      </VStack>
    </GluestackToast>
  );
};

export default Toast;
