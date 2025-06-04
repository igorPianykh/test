import { StyleSheet } from 'react-native';
import {
  darkBlue,
  gallery,
  primaryBlue,
  primaryGreen,
  white,
} from '../../assets/colors.ts';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: darkBlue,
    flex: 1,
  },
  button: {
    padding: 24,
    backgroundColor: primaryGreen,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: white,
  },
  headerContainer: {
    backgroundColor: primaryBlue,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: white,
    fontSize: 16,
    fontWeight: '600',
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
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
