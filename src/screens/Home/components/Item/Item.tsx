// React Native
import { Image, Pressable, View } from 'react-native';

// Styles
import styles from './styles';

// Utils
import { CRIPTO_CURRENCY_LOGO_ENDPOINT } from '../../../../../hardcoded';

// Types
import { CryptoCurrencyInfoType } from '../../../../types/CryptoCurrency';
import { Typography } from '../../../../components';

interface Props {
  info: CryptoCurrencyInfoType;
  onPress: () => void;
}

const Item = ({ info, onPress }: Props) => {
  const { name, id, symbol, price } = info;
  const uri = `${CRIPTO_CURRENCY_LOGO_ENDPOINT}/${id}.png`;
  const currentPrice = price.toFixed(2);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.cryptoCurrencyLogoContainer}>
          <Image source={{ uri }} style={styles.cryptoCurrencyLogo} />
        </View>
        <View style={styles.informationContainer}>
          <Typography fontWeight="medium" fontSize={16}>
            {symbol}
          </Typography>

          <Typography color="mediumGray" fontSize={14}>
            {name}
          </Typography>
        </View>
        <View style={styles.priceContainer}>
          <Typography fontWeight="medium" fontSize={16}>
            {currentPrice} USD
          </Typography>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
