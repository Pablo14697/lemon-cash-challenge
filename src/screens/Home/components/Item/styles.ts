import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    height: 80,
    borderRadius: 10,
    padding: 15,
  },
  cryptoCurrencyLogoContainer: {
    flexDirection: 'row',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cryptoCurrencyLogo: { width: 35, height: 35 },
  informationContainer: {
    flexDirection: 'column',
    width: '40%',
    justifyContent: 'space-around',
  },
  priceContainer: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default styles;
