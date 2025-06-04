import { StyleSheet } from 'react-native';
import { black } from '../../assets/colors.ts';

const styles = StyleSheet.create({
  text: {
    color: black,
    fontSize: 26,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  userInfo: {
    alignItems: 'center',
    gap: 10,
  },
});

export default styles;
