import { StyleSheet } from 'react-native';
import { black, darkBlue, primaryBlue, white } from '../../assets/colors.ts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  text: {
    color: black,
    fontSize: 26,
    fontWeight: '600',
  },
  headerContainer: {
    backgroundColor: primaryBlue,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    gap: 10,
  },
  headerText: {
    color: white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: white,
  },
  backButton: {
    marginLeft: -15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
