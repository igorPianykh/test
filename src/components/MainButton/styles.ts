import { StyleSheet } from 'react-native';
import { lightGreen, primaryGreen, white } from '../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  button: (disabled: boolean) => ({
    paddingVertical: 15,
    backgroundColor: disabled ? lightGreen : primaryGreen,
    alignItems: 'center',
  }),
  text: {
    fontSize: 16,
    color: white,
    fontWeight: '600',
  },
});

export default styles;
