// React
import { Dispatch, SetStateAction, createContext, useState } from 'react';

// Types
import { CriptoCurrencyInfoType } from '../../types/CriptoCurrency';

type CriptoCurrencyContext = {
  criptoCurrencyInfo: CriptoCurrencyInfoType;
  setCriptoCurrencyInfo: Dispatch<SetStateAction<CriptoCurrencyInfoType>>;
  resetCriptoCurrencyInfo: () => void;
};

const DEFAULT_CRIPTO_CURRENCY_INFO = {
  id: '',
  name: '',
  symbol: '',
  price: 0,
  percentChange24hs: 0,
};

export const CriptoCurrencyContext = createContext<CriptoCurrencyContext>({
  criptoCurrencyInfo: DEFAULT_CRIPTO_CURRENCY_INFO,
  setCriptoCurrencyInfo: () => {},
  resetCriptoCurrencyInfo: () => {},
});

const CriptoCurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [criptoCurrencyInfo, setCriptoCurrencyInfo] =
    useState<CriptoCurrencyInfoType>(DEFAULT_CRIPTO_CURRENCY_INFO);

  const resetCriptoCurrencyInfo = () =>
    setCriptoCurrencyInfo(DEFAULT_CRIPTO_CURRENCY_INFO);

  return (
    <CriptoCurrencyContext.Provider
      value={{
        criptoCurrencyInfo,
        setCriptoCurrencyInfo,
        resetCriptoCurrencyInfo,
      }}>
      {children}
    </CriptoCurrencyContext.Provider>
  );
};

export default CriptoCurrencyProvider;
