import React from 'react';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles.ts';
import { lightGray } from '../../assets/colors.ts';

interface Props {
  children: React.ReactElement;
  onPress?: () => void;
  onPressBack?: () => void;
  title: string;
}

const PageLayout: React.FC<Props> = ({
  children,
  onPress,
  title,
  onPressBack,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} testID="page-layout">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          {onPressBack && (
            <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
              <Ionicon name="chevron-back" size={24} color={lightGray} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PageLayout;
