// React
import { useMemo, useState } from 'react';

// React Native
import { Pressable, View } from 'react-native';

// Components
import { Typography } from '../../../../components';

// Styles
import styles from './styles';

// Utils
import formatNumberWithCommas from '../../../../utils/formatNumberWithCommas';

// Types
import { Quote } from '../../CryptoCurrency.types';

const Graph = ({ id, quote }: { id: string | null; quote: Quote }) => {
  const [indexPercentSelected, setIndexPercentSelected] = useState(0);

  const PERCENTS_CHANGE = useMemo(() => {
    return [
      { title: '24H', value: quote?.percent_change_24h },
      { title: '7D', value: quote?.percent_change_7d },
      { title: '1M', value: quote?.percent_change_30d },
      { title: '3M', value: quote?.percent_change_90d },
    ];
  }, [id, JSON.stringify(quote)]);

  return (
    <View style={styles.graphContainer}>
      <Typography fontWeight="bold" fontSize={36}>
        {formatNumberWithCommas(
          PERCENTS_CHANGE[indexPercentSelected]?.value?.toFixed(3),
        )}
        %
      </Typography>
      <View style={styles.switchContainer}>
        {PERCENTS_CHANGE.map((percent, index) => (
          <Pressable
            onPress={() => setIndexPercentSelected(index)}
            style={styles.containerButton}
            key={percent.title}>
            <View
              style={{
                ...styles.backgroundButton,
                backgroundColor:
                  indexPercentSelected === index ? '#ffffff' : 'transparent',
              }}>
              <Typography
                fontWeight="medium"
                fontSize={14}
                color={
                  indexPercentSelected === index ? 'darkGray' : 'mediumGray'
                }>
                {percent.title}
              </Typography>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Graph;
