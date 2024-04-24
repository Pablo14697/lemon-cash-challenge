// React
import { useState, useEffect, useContext } from 'react';

// React Native
import {
  Image,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Pressable,
} from 'react-native';

// Components
import { Loading, Typography } from '../../components';

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
import {
  getPreferredCryptoCurrencies,
  updatePreferredCryptoCurrencies,
} from './components/Header/utils/preferredCurrencyStorage';

const CryptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [indexPercentSelected, setIndexPercentSelected] = useState(0);
  const [info, setInfo] = useState({
    id: null,
    name: '',
    symbol: '',
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchCryptoCurrency();
  };

  const updatePreferredInfo = async cryptoInfo => {
    const preferredCryptoCurrencies =
      (await getPreferredCryptoCurrencies()) || [];
    const cryptoCurrencyIndex = preferredCryptoCurrencies.findIndex(
      preferredCryptoCurrency => {
        return preferredCryptoCurrency.symbol === cryptoInfo.symbol;
      },
    );

    if (cryptoCurrencyIndex !== -1) {
      preferredCryptoCurrencies[cryptoCurrencyIndex] = {
        id: cryptoInfo.id,
        name: cryptoInfo.name,
        symbol: cryptoInfo.symbol,
        price: cryptoInfo.quote?.USD?.price,
      };
    }
    await updatePreferredCryptoCurrencies(
      JSON.stringify(preferredCryptoCurrencies),
    );
  };

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

      if (data?.data) {
        const cryptoInfo = data.data?.[cryptoCurrencyInfo?.symbol];
        setInfo(cryptoInfo);
        await updatePreferredInfo(cryptoInfo);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (!info.id) {
      setLoading(true);
    }

    fetchCryptoCurrency();

    const interval = setInterval(() => {
      setRefreshing(true);
      fetchCryptoCurrency();
    }, 30000);

    return () => clearInterval(interval);
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                  <Typography fontSize={24} fontWeight="bold">
                    {quote?.price?.toFixed(2)}
                  </Typography>

                  <Typography
                    fontSize={16}
                    color="mediumGray"
                    fontWeight="medium">
                    USD
                  </Typography>
                </>
              </View>
            </View>
            <View style={styles.graphContainer}>
              <Typography fontWeight="bold" fontSize={36}>
                {PERCENTS_CHANGE[indexPercentSelected]?.value?.toFixed(2)}%
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
                          indexPercentSelected === index
                            ? '#ffffff'
                            : 'transparent',
                      }}>
                      <Typography
                        fontWeight="medium"
                        fontSize={14}
                        color={
                          indexPercentSelected === index
                            ? 'darkGray'
                            : 'mediumGray'
                        }>
                        {percent.title}
                      </Typography>
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
