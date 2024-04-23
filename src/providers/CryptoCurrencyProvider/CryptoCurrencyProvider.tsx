// React
import { Dispatch, SetStateAction, createContext, useState } from 'react';

// Types
import { CryptoCurrencyInfoType } from '../../types/CryptoCurrency';

type CryptoCurrencyContext = {
  cryptoCurrencyInfo: CryptoCurrencyInfoType;
  setCryptoCurrencyInfo: Dispatch<SetStateAction<CryptoCurrencyInfoType>>;
  resetCryptoCurrencyInfo: () => void;
};

const DEFAULT_CRIPTO_CURRENCY_INFO = {
  id: '',
  name: '',
  symbol: '',
  price: 0,
  percentChange24hs: 0,
};

export const CryptoCurrencyContext = createContext<CryptoCurrencyContext>({
  cryptoCurrencyInfo: DEFAULT_CRIPTO_CURRENCY_INFO,
  setCryptoCurrencyInfo: () => {},
  resetCryptoCurrencyInfo: () => {},
});

const CryptoCurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cryptoCurrencyInfo, setCryptoCurrencyInfo] =
    useState<CryptoCurrencyInfoType>(DEFAULT_CRIPTO_CURRENCY_INFO);

  const resetCryptoCurrencyInfo = () =>
    setCryptoCurrencyInfo(DEFAULT_CRIPTO_CURRENCY_INFO);

  return (
    <CryptoCurrencyContext.Provider
      value={{
        cryptoCurrencyInfo,
        setCryptoCurrencyInfo,
        resetCryptoCurrencyInfo,
      }}>
      {children}
    </CryptoCurrencyContext.Provider>
  );
};

export default CryptoCurrencyProvider;
