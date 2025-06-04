import { StyleSheet } from 'react-native';
import { gallery, primaryGreen } from '../../assets/colors.ts';

const styles = StyleSheet.create({
  button: {
    padding: 24,
    backgroundColor: primaryGreen,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    marginTop: 20,
    padding: 16,
    gap: 30,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    backgroundColor: gallery,
    padding: 16,
  },
});

export default styles;
