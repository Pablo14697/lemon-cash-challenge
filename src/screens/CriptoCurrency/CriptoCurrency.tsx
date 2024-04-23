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
} from 'react-native';

// Utils
import {
  API_KEY,
  CRIPTO_CURRENCY_INFO_ENDPOINT,
  CRIPTO_CURRENCY_LOGO_ENDPOINT,
} from '../../../hardcoded';

// Context
import { CriptoCurrencyContext } from '../../providers/CriptoCurrencyProvider/CriptoCurrencyProvider';

const CriptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [indexPercentSelected, setIndexPercentSelected] = useState(0);
  const [info, setInfo] = useState(false);
  const { criptoCurrencyInfo } = useContext(CriptoCurrencyContext);

  const fetchCriptoCurrency = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${CRIPTO_CURRENCY_INFO_ENDPOINT}?symbol=${criptoCurrencyInfo?.symbol}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
        },
      );

      const json = await response.json();
      setInfo(json?.data?.[criptoCurrencyInfo?.symbol]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCriptoCurrency();
  }, []);

  const quote = info?.quote?.USD;
  const PERCENTS_CHANGE = [
    { title: '24H', value: quote?.percent_change_24h },
    { title: '7D', value: quote?.percent_change_7d },
    { title: '1M', value: quote?.percent_change_30d },
    { title: '3M', value: quote?.percent_change_90d },
    { title: 'MAX', value: quote?.percent_change_7d },
  ];

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          backgroundColor: '#fafafa',
        }}
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fafafa',
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchCriptoCurrency}
          />
        }>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Image
              source={{
                uri: `${CRIPTO_CURRENCY_LOGO_ENDPOINT}/${criptoCurrencyInfo?.id}.png`,
              }}
              style={{
                height: 35,
                width: 35,
                objectFit: 'contain',
              }}
            />
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <>
                <Text style={{ fontSize: 24, fontFamily: 'NeueMontreal-Bold' }}>
                  {quote?.price?.toFixed(2)}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#888888',
                    fontFamily: 'NeueMontreal-Medium',
                  }}>
                  USD
                </Text>
              </>
            </View>
          </View>
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: '#e6e6e6',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: 20,
            }}>
            <Text style={{ fontFamily: 'NeueMontreal-Bold', fontSize: 36 }}>
              {PERCENTS_CHANGE[indexPercentSelected]?.value?.toFixed(2)}%
            </Text>
            <View
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#fafafa',
                borderRadius: 10,
                marginTop: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {PERCENTS_CHANGE.map((percent, index) => (
                <Pressable
                  onPress={() => setIndexPercentSelected(index)}
                  style={{
                    width: '20%',
                    borderRadius: 10,
                    padding: 4,
                  }}
                  key={percent.title}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      backgroundColor:
                        indexPercentSelected === index
                          ? '#ffffff'
                          : 'transparent',
                      zIndex: -1,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'NeueMontreal-Medium',
                        fontSize: 14,
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
    </SafeAreaView>
  );
};

export default CriptoCurrency;
