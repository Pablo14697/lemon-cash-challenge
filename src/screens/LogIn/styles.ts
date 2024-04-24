import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: '50%',
    paddingBottom: '20%',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    justifyContent: 'space-between',
  },
  logo: {
    height: '40%',
    width: '40%',
    objectFit: 'contain',
  },
  loginButtonContainer: { width: '100%', alignItems: 'center', gap: 10 },
  loginButton: {
    backgroundColor: '#121212',
    width: '100%',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
