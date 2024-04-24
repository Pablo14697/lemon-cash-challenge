// React
import { useContext, useEffect, useState } from 'react';

// Context
import { CryptoCurrencyContext } from '../../../providers/CryptoCurrencyProvider/CryptoCurrencyProvider';

// Utils
import API from '../../../api';
import { CRIPTO_CURRENCIES_ENDPOINT } from '../../../../hardcoded';
import { getPreferredCryptoCurrencies } from '../../../utils/preferredCurrencyStorage';

// Types
import { CryptoCurrencyInfoType } from '../../../types/CryptoCurrency';

type CryptoCurrencyResponse = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
};

type ResponseAPI = {
  data: CryptoCurrencyResponse[];
};

const DEFAULT_LIMIT = 10;

const useCryptoCurrencies = () => {
  const [toggleSelected, setToggleSelected] = useState<'ALL' | 'STARRED'>(
    'ALL',
  );
  const [cryptoCurrencies, setCryptoCurrencies] = useState<
    CryptoCurrencyInfoType[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(1);

  const { setCryptoCurrencyInfo } = useContext(CryptoCurrencyContext);

  const fetchCryptoCurrenctyList = async (
    start = 1,
    toggleSelected = 'ALL',
  ) => {
    try {
      if (toggleSelected === 'ALL') {
        const response = await API.get(
          `${CRIPTO_CURRENCIES_ENDPOINT}?limit=${DEFAULT_LIMIT}&start=${start}`,
        );
        const data = (response as ResponseAPI).data.map(
          (cryptoCurrency: CryptoCurrencyResponse) => {
            return {
              id: cryptoCurrency?.id,
              name: cryptoCurrency?.name,
              symbol: cryptoCurrency?.symbol,
              price: cryptoCurrency?.quote?.USD.price,
            };
          },
        );
        setCryptoCurrencies(
          start === 1 ? data : [...cryptoCurrencies, ...data],
        );
      } else {
        const response = await getPreferredCryptoCurrencies();
        const data = response.map((cryptoCurrency: CryptoCurrencyResponse) => {
          return {
            id: cryptoCurrency?.id,
            name: cryptoCurrency?.name,
            symbol: cryptoCurrency?.symbol,
            price: cryptoCurrency?.price,
          };
        });
        setCryptoCurrencies(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onToggleChanged = (x: 'ALL' | 'STARRED') => {
    setLoading(true);
    setToggleSelected(x);
    fetchCryptoCurrenctyList(1, x);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCryptoCurrenctyList(1, toggleSelected);
  };

  const onEndReached = () => setStart(DEFAULT_LIMIT + start);

  useEffect(() => {
    if (!cryptoCurrencies.length) {
      setLoading(true);
    }
    fetchCryptoCurrenctyList(start, toggleSelected);
  }, [start]);

  return {
    loading,
    refreshing,
    cryptoCurrencies,
    setCryptoCurrencyInfo,
    onRefresh,
    onEndReached,
    toggleSelected,

    onToggleChanged,
  };
};

export default useCryptoCurrencies;
