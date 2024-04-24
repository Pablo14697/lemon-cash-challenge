import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 60,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    gap: 5,
  },
  toggleButtonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '35%',

    paddingHorizontal: 10,
    backgroundColor: '#fafafa',

    borderRadius: 10,
  },
  toggleButtonInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '35%',
    borderColor: '#fafafa',
    borderWidth: 1,

    paddingHorizontal: 10,
    borderRadius: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoutIcon: { height: 25, width: 25 },
});

export default styles;
