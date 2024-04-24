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
    borderBottomWidth: 0.2,
    paddingLeft: 10,
    paddingRight: 20,
  },

  titleContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoutButton: {
    flexDirection: 'row',
    gap: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoutIcon: { height: 25, width: 25 },
});

export default styles;
