import { StyleSheet } from 'react-native';
import { darkBlue, gallery } from '../../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  safeArea: {
    backgroundColor: gallery,
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerText: {
    color: darkBlue,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  bottomContainer: {
    padding: 16,
  },
  descriptionText: {
    flex: 1,
    color: darkBlue,
    fontSize: 16,
    marginLeft: 4,
  },
  descriptionContainer: {
    marginTop: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
