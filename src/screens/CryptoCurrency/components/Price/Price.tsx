// React Native
import { Image, View } from 'react-native';

// Components
import { Typography } from '../../../../components';

// Styles
import styles from './styles';

// Utils
import formatNumberWithCommas from '../../../../utils/formatNumberWithCommas';

// Utils
import { CRIPTO_CURRENCY_LOGO_ENDPOINT } from '../../../../../env';

const Price = ({ id, value }: { id: string; value: number }) => (
  <View style={styles.firstRowContainer}>
    <Image
      source={{
        uri: `${CRIPTO_CURRENCY_LOGO_ENDPOINT}/${id}.png`,
      }}
      style={styles.cryptoLogo}
    />
    <View style={styles.cryptoPriceContainer}>
      <>
        <Typography fontSize={24} fontWeight="bold">
          {formatNumberWithCommas(value.toFixed(3))}
        </Typography>

        <Typography fontSize={16} color="mediumGray" fontWeight="medium">
          USD
        </Typography>
      </>
    </View>
  </View>
);

export default Price;
