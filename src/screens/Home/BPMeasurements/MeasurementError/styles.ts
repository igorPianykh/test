import { StyleSheet } from 'react-native';
import { darkBlue, gallery, white } from '../../../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  safeArea: {
    backgroundColor: white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: gallery,
  },
  headerText: {
    color: darkBlue,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20,
  },
  descriptionText: {
    marginTop: 16,
    color: darkBlue,
    fontSize: 16,
    textAlign: 'center',
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: gallery,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default styles;
