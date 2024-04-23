// React Native
import { Image, Pressable, Text, View } from 'react-native';

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
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#ffffff',
          height: 80,
          borderRadius: 10,
          padding: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '20%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Image source={{ uri }} style={{ width: 35, height: 35 }} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '40%',
            justifyContent: 'space-around',
          }}>
          <Text style={{ fontFamily: 'NeueMontreal-Medium', fontSize: 16 }}>
            {symbol}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14 }}>{name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '40%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={{ fontFamily: 'NeueMontreal-Medium', fontSize: 16 }}>
            {currentPrice} USD
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
