// React Native
import { Image, Pressable, Text, View } from 'react-native';

// Styles
import styles from './styles';

// Utils
import { CRIPTO_CURRENCY_LOGO_ENDPOINT } from '../../../../../hardcoded';

// Types
import { CryptoCurrencyInfoType } from '../../../../types/CryptoCurrency';

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
          <Text style={styles.symbolText}>{symbol}</Text>

          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{currentPrice} USD</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
