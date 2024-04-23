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
  symbolText: { fontFamily: 'NeueMontreal-Medium', fontSize: 16 },
  nameText: { color: '#888888', fontSize: 14 },
  priceContainer: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceText: { fontFamily: 'NeueMontreal-Medium', fontSize: 16 },
});

export default styles;
