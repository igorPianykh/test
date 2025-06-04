import { StyleSheet } from 'react-native';
import { darkBlue, gallery, white } from '../../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  safeArea: {
    backgroundColor: white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: gallery,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
  progressText: (WIDTH: string) => ({
    width: WIDTH,
    marginVertical: 8,
  }),
  iconContainer: { marginBottom: 32 },
  text: {
    color: darkBlue,
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    backgroundColor: gallery,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
