// React
import { useState, useEffect, useContext } from 'react';

// React Native
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Pressable,
  ActivityIndicator,
} from 'react-native';

// Styles
import styles from './styles';

// Utils
import {
  API_KEY,
  CRIPTO_CURRENCY_INFO_ENDPOINT,
  CRIPTO_CURRENCY_LOGO_ENDPOINT,
} from '../../../hardcoded';

// Context
import { CryptoCurrencyContext } from '../../providers/CryptoCurrencyProvider/CryptoCurrencyProvider';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="small" color="#121212" />
  </View>
);

const CryptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [indexPercentSelected, setIndexPercentSelected] = useState(0);
  const [info, setInfo] = useState({
    id: null,
    quote: {
      USD: {
        percent_change_24h: 0,
        percent_change_7d: 0,
        percent_change_30d: 0,
        percent_change_90d: 0,
        price: 0,
      },
    },
  });
  const { cryptoCurrencyInfo } = useContext(CryptoCurrencyContext);

  const fetchCryptoCurrency = async () => {
    try {
      const response = await fetch(
        `${CRIPTO_CURRENCY_INFO_ENDPOINT}?symbol=${cryptoCurrencyInfo?.symbol}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
        },
      );

      const data = await response.json();
      setInfo(data?.data?.[cryptoCurrencyInfo?.symbol]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!info.id) {
      setLoading(true);
    }

    fetchCryptoCurrency();
  }, []);

  const quote = info?.quote?.USD;
  const PERCENTS_CHANGE = [
    { title: '24H', value: quote?.percent_change_24h },
    { title: '7D', value: quote?.percent_change_7d },
    { title: '1M', value: quote?.percent_change_30d },
    { title: '3M', value: quote?.percent_change_90d },
  ];

  return (
    <SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchCryptoCurrency}
            />
          }>
          <View style={styles.cryptoInfoContainer}>
            <View style={styles.firstRowContainer}>
              <Image
                source={{
                  uri: `${CRIPTO_CURRENCY_LOGO_ENDPOINT}/${cryptoCurrencyInfo?.id}.png`,
                }}
                style={styles.cryptoLogo}
              />
              <View style={styles.cryptoPriceContainer}>
                <>
                  <Text style={styles.cryptoPriceText}>
                    {quote?.price?.toFixed(2)}
                  </Text>
                  <Text style={styles.cryptoCurrencyText}>USD</Text>
                </>
              </View>
            </View>
            <View style={styles.graphContainer}>
              <Text style={styles.percentText}>
                {PERCENTS_CHANGE[indexPercentSelected]?.value?.toFixed(2)}%
              </Text>
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
                          indexPercentSelected === index
                            ? '#ffffff'
                            : 'transparent',
                      }}>
                      <Text
                        style={{
                          ...styles.textButton,
                          color:
                            indexPercentSelected === index
                              ? '#454545'
                              : '#888888',
                        }}>
                        {percent.title}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CryptoCurrency;
