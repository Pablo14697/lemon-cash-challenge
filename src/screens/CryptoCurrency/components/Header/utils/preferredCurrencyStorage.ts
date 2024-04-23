// Library
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { CryptoCurrencyInfoType } from '../../../../../types/CryptoCurrency';

const PREFERRED_CRIPTO_CURRENCIES_KEY = 'PREFERRED_CRIPTO_CURRENCIES_KEY';

export const setPreferredCryptoCurrencies = async (
  cryptoCurrency: CryptoCurrencyInfoType,
) => {
  const preferredCryptoCurrencies = await getPreferredCryptoCurrencies();
  preferredCryptoCurrencies.push(cryptoCurrency);

  const preferredCryptoCurrenciesToString = JSON.stringify(
    preferredCryptoCurrencies,
  );

  await AsyncStorage.setItem(
    PREFERRED_CRIPTO_CURRENCIES_KEY,
    preferredCryptoCurrenciesToString,
  );
};

export const getPreferredCryptoCurrencies = async () => {
  const preferredCryptoCurrencies =
    (await AsyncStorage.getItem(PREFERRED_CRIPTO_CURRENCIES_KEY)) || '[]';
  return JSON.parse(preferredCryptoCurrencies);
};

export const removePreferredCryptoCurrencies = async (
  cryptoCurrency: CryptoCurrencyInfoType,
) => {
  const preferredCryptoCurrencies = await getPreferredCryptoCurrencies();
  const cryptoCurrencyIndex = preferredCryptoCurrencies.indexOf(
    (preferredCryptoCurrency: CryptoCurrencyInfoType) =>
      preferredCryptoCurrency.id === cryptoCurrency.id,
  );

  preferredCryptoCurrencies.splice(cryptoCurrencyIndex, 1);

  const preferredCryptoCurrenciesToString = JSON.stringify([
    ...new Set(preferredCryptoCurrencies),
  ]);

  await AsyncStorage.setItem(
    PREFERRED_CRIPTO_CURRENCIES_KEY,
    preferredCryptoCurrenciesToString,
  );
};
