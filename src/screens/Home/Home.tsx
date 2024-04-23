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
import { CriptoCurrencyContext } from '../../providers/CriptoCurrencyProvider/CriptoCurrencyProvider';

// Types
import { CriptoCurrencyInfoType } from '../../types/CriptoCurrency';

const DEFAULT_LIMIT = 10;

type CriptoCurrencyResponse = {
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
  data: CriptoCurrencyResponse[];
};

const Home = () => {
  const [criptoCurrencies, setCriptoCurrencies] = useState<
    CriptoCurrencyInfoType[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(1);

  const { setCriptoCurrencyInfo } = useContext(CriptoCurrencyContext);

  const navigation = useNavigation();

  const fetchCriptoCurrenctyList = async (start = 1) => {
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
      const data: CriptoCurrencyInfoType[] = dataToJson.data.map(
        (criptoCurrency: CriptoCurrencyResponse) => {
          return {
            id: criptoCurrency?.id,
            name: criptoCurrency?.name,
            symbol: criptoCurrency?.symbol,
            price: criptoCurrency?.quote?.USD.price,
            percentChange24hs: criptoCurrency?.quote?.USD.percent_change_24h,
          };
        },
      );
      setCriptoCurrencies(start === 1 ? data : [...criptoCurrencies, ...data]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCriptoCurrenctyList();
  };

  const handleItemPressed = (
    criptoCurrencySelected: CriptoCurrencyInfoType,
  ) => {
    setCriptoCurrencyInfo(criptoCurrencySelected);
    navigation.navigate('CriptoCurrency');
  };

  const renderItem = ({ item }: { item: CriptoCurrencyInfoType }) => {
    const criptoCurrencyInfo = {
      id: item?.id,
      name: item?.name,
      symbol: item?.symbol,
      price: item?.price,
      percentChange24hs: item?.percentChange24hs,
    };
    return (
      <Item
        info={criptoCurrencyInfo}
        onPress={() => {
          handleItemPressed(criptoCurrencyInfo);
        }}
      />
    );
  };

  useEffect(() => {
    if (!criptoCurrencies.length) {
      setLoading(true);
    }
    fetchCriptoCurrenctyList(start);
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
          data={criptoCurrencies}
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
