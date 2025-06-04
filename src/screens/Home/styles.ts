import { Dimensions, StyleSheet } from 'react-native';
import {
  black,
  gallery,
  primaryGreen,
  warning,
  white,
} from '../../assets/colors.ts';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gallery,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  startButtonText: {
    fontSize: width * 0.08,
    color: white,
  },
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: warning,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  bannerText: { color: white, fontSize: 14 },
});

export default styles;
