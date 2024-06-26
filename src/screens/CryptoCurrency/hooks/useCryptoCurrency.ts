// React
import { useState, useEffect, useContext } from 'react';

// Utils
import { CRIPTO_CURRENCY_INFO_ENDPOINT } from '../../../../env';
import API from '../../../api';

// Context
import {
  getPreferredCryptoCurrencies,
  updatePreferredCryptoCurrencies,
} from '../../../utils/preferredCurrencyStorage';

// Types
import { CriptoCurrencyInfo } from '../CryptoCurrency.types';
import { CryptoCurrencyContext } from '../../../providers/CryptoCurrencyProvider/CryptoCurrencyProvider';

type ResponseAPI = { data: Record<string, CriptoCurrencyInfo> };

const useCryptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [info, setInfo] = useState<CriptoCurrencyInfo>({
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

  const updatePreferredInfo = async (cryptoInfo: CriptoCurrencyInfo) => {
    const preferredCryptoCurrencies =
      (await getPreferredCryptoCurrencies()) || [];

    const cryptoCurrencyIndex = preferredCryptoCurrencies.findIndex(
      (preferredCryptoCurrency: CriptoCurrencyInfo) => {
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

    await updatePreferredCryptoCurrencies(preferredCryptoCurrencies);
  };

  const fetchCryptoCurrency = async () => {
    setError(false);
    try {
      const response = (await API.get(
        `${CRIPTO_CURRENCY_INFO_ENDPOINT}?symbol=${cryptoCurrencyInfo?.symbol}`,
      )) as ResponseAPI;

      if (response?.data && cryptoCurrencyInfo.symbol) {
        const cryptoInfo = response.data[cryptoCurrencyInfo.symbol];
        setInfo(cryptoInfo);
        await updatePreferredInfo(cryptoInfo);
      }
    } catch (error) {
      setError(true);
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

  return { info, loading, refreshing, onRefresh, cryptoCurrencyInfo, error };
};

export default useCryptoCurrency;
