import { StyleSheet } from 'react-native';
import { black, danger, lightGray, primaryGreen } from '../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  container: {
    gap: 5,
  },
  label: (error: boolean) => ({
    color: error ? danger : primaryGreen,
  }),
  input: (error: boolean) => ({
    borderBottomColor: error ? danger : lightGray,
    borderBottomWidth: 1,
    padding: 5,
    color: black,
    height: 35,
  }),
  error: {
    color: danger,
  },
});

export default styles;
