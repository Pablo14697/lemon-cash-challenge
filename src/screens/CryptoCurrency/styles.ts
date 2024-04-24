import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fafafa',
  },
  scrollViewContentContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  cryptoInfoContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  firstRowContainer: { flexDirection: 'row', gap: 10 },
  cryptoLogo: {
    height: 35,
    width: 35,
    objectFit: 'contain',
  },
  cryptoPriceContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  cryptoPriceText: { fontSize: 24, fontFamily: 'NeueMontreal-Bold' },
  cryptoCurrencyText: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'NeueMontreal-Medium',
  },
  graphContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#e6e6e6',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  percentText: { fontFamily: 'NeueMontreal-Bold', fontSize: 36 },
  switchContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginTop: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButton: {
    width: '25%',
    borderRadius: 10,
    padding: 4,
  },
  backgroundButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: -1,
  },
  textButton: { fontFamily: 'NeueMontreal-Medium', fontSize: 14 },
});

export default styles;
