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
  const [, setInfo] = useState(false);
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

  return (
    <ScrollView
      style={{ backgroundColor: '#fafafa' }}
      contentContainerStyle={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fafafa',
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchCriptoCurrency} />
      }>
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', gap: 15 }}>
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
              style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              {criptoCurrencyInfo?.price && (
                <>
                  <Text
                    style={{ fontSize: 24, fontFamily: 'NeueMontreal-Bold' }}>
                    {criptoCurrencyInfo.price?.toFixed(2)}
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
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CriptoCurrency;
