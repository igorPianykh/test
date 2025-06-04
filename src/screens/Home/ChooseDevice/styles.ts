import { StyleSheet } from 'react-native';
import { darkBlue, gallery, lightGray, white } from '../../../assets/colors.ts';

const styles = StyleSheet.create<any>({
  safeArea: {
    backgroundColor: white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: gallery,
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: darkBlue,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    backgroundColor: gallery,
    padding: 16,
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    marginVertical: 6,
    backgroundColor: lightGray,
    borderRadius: 6,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    color: darkBlue,
    paddingBottom: 2,
  },
  itemDescriptionText: {
    fontSize: 14,
    color: darkBlue,
  },
});

export default styles;
