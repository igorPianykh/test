import { StyleSheet } from 'react-native';
import {
  black,
  primaryBlue,
  primaryGray,
  white,
} from '../../../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  card: {
    backgroundColor: white,
    padding: 16,
    borderRadius: 8,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  leftSection: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    color: primaryBlue,
  },
  unit: {
    fontSize: 16,
    color: primaryGray,
  },
  number: {
    fontSize: 40,
    fontWeight: 'bold',
    color: primaryBlue,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
});

export default styles;
