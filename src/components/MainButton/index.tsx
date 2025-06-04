import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles.ts';

interface Props {
  onPress: () => void;
  buttonText: string;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const MainButton: React.FC<Props> = ({
  onPress,
  buttonText,
  disabled,
  accessibilityLabel = 'btn',
}) => {
  return (
    <Pressable
      style={styles.button(disabled)}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}>
      <Text style={styles.text}>{buttonText}</Text>
    </Pressable>
  );
};

export default MainButton;
