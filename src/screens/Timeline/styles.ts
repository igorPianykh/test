import { StyleSheet } from 'react-native';
import {
  darkBlue,
  graphite,
  lightGray,
  lightGreen,
  primaryBlue,
  primaryGreen,
  white,
} from '../../assets/colors.ts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkBlue,
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
  container: {
    flex: 1,
    backgroundColor: white,
  },
  sectionHeader: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: lightGreen,
  },
  sectionHeaderText: {
    color: primaryGreen,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    padding: 15,
  },
  measurementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    gap: 10,
  },
  measurement: {
    flexDirection: 'row',
    gap: 5,
  },
  value: {
    color: graphite,
    fontSize: 16,
    fontWeight: '700',
  },
  unit: {
    color: graphite,
    fontSize: 16,
  },
  divider: {
    height: 0.7,
    backgroundColor: lightGray,
  },
});

export default styles;
