import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  firstRowContainer: { flexDirection: 'row', gap: 10 },
  cryptoLogo: {
    height: 35,
    width: 35,
    objectFit: 'contain',
  },
  cryptoPriceContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
});

export default styles;
