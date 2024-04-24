import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: '#fafafa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    paddingLeft: 10,
    paddingRight: 20,
    borderBottomWidth: 0.2,
  },
  backButton: { width: '10%', justifyContent: 'center' },
  backIcon: { height: 25, width: 25 },
  centerContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferredButton: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  preferredIcon: { height: 30, width: 30 },
  preferredBackgroundButton: {
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
});

export default styles;
