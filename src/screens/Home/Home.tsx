// React
import { useContext, useEffect, useState } from 'react';

// React Native
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';

// Components
import { Item } from './components';

// Hooks
import { useNavigation } from '../../navigation/hooks';

// Utils
import { API_KEY, CRIPTO_CURRENCIES_ENDPOINT } from '../../../hardcoded';

// Context
import { CryptoCurrencyContext } from '../../providers/CryptoCurrencyProvider/CryptoCurrencyProvider';

// Types
import { CryptoCurrencyInfoType } from '../../types/CryptoCurrency';

const DEFAULT_LIMIT = 10;

type CryptoCurrencyResponse = {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
};
type Response = {
  data: CryptoCurrencyResponse[];
};

const Home = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState<
    CryptoCurrencyInfoType[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(1);

  const { setCryptoCurrencyInfo } = useContext(CryptoCurrencyContext);

  const navigation = useNavigation();

  const fetchCryptoCurrenctyList = async (start = 1) => {
    try {
      const response = await fetch(
        `${CRIPTO_CURRENCIES_ENDPOINT}?limit=${DEFAULT_LIMIT}&start=${start}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
        },
      );

      const dataToJson: Response = await response.json();
      const data: CryptoCurrencyInfoType[] = dataToJson.data.map(
        (cryptoCurrency: CryptoCurrencyResponse) => {
          return {
            id: cryptoCurrency?.id,
            name: cryptoCurrency?.name,
            symbol: cryptoCurrency?.symbol,
            price: cryptoCurrency?.quote?.USD.price,
            percentChange24hs: cryptoCurrency?.quote?.USD.percent_change_24h,
          };
        },
      );
      setCryptoCurrencies(start === 1 ? data : [...cryptoCurrencies, ...data]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCryptoCurrenctyList();
  };

  const handleItemPressed = (
    cryptoCurrencySelected: CryptoCurrencyInfoType,
  ) => {
    setCryptoCurrencyInfo(cryptoCurrencySelected);
    navigation.navigate('CryptoCurrency');
  };

  const renderItem = ({ item }: { item: CryptoCurrencyInfoType }) => {
    const cryptoCurrencyInfo = {
      id: item?.id,
      name: item?.name,
      symbol: item?.symbol,
      price: item?.price,
      percentChange24hs: item?.percentChange24hs,
    };
    return (
      <Item
        info={cryptoCurrencyInfo}
        onPress={() => {
          handleItemPressed(cryptoCurrencyInfo);
        }}
      />
    );
  };

  useEffect(() => {
    if (!cryptoCurrencies.length) {
      setLoading(true);
    }
    fetchCryptoCurrenctyList(start);
  }, [start]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fafafa' ,       
  }}>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="small" color="#121212" />
        </View>
      ) : (
        <FlatList
          onRefresh={onRefresh}
           refreshing={refreshing}
          data={cryptoCurrencies}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10, width: '100%' }} />
          )}
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 10  }}
          onEndReached={() => {
            setStart(DEFAULT_LIMIT + start);
          }}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
