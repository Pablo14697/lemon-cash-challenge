// Library
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { CriptoCurrencyInfoType } from '../../../../../types/CriptoCurrency';

const PREFERRED_CRIPTO_CURRENCIES_KEY = 'PREFERRED_CRIPTO_CURRENCIES_KEY';

export const setPreferredCriptoCurrencies = async (
  criptoCurrency: CriptoCurrencyInfoType,
) => {
  const preferredCriptoCurrencies = await getPreferredCriptoCurrencies();
  preferredCriptoCurrencies.push(criptoCurrency);

  const preferredCriptoCurrenciesToString = JSON.stringify(
    preferredCriptoCurrencies,
  );

  await AsyncStorage.setItem(
    PREFERRED_CRIPTO_CURRENCIES_KEY,
    preferredCriptoCurrenciesToString,
  );
};

export const getPreferredCriptoCurrencies = async () => {
  const preferredCriptoCurrencies =
    (await AsyncStorage.getItem(PREFERRED_CRIPTO_CURRENCIES_KEY)) || '[]';
  return JSON.parse(preferredCriptoCurrencies);
};

export const removePreferredCriptoCurrencies = async (
  criptoCurrency: CriptoCurrencyInfoType,
) => {
  const preferredCriptoCurrencies = await getPreferredCriptoCurrencies();
  const criptoCurrencyIndex = preferredCriptoCurrencies.indexOf(
    (preferredCriptoCurrency: CriptoCurrencyInfoType) =>
      preferredCriptoCurrency.id === criptoCurrency.id,
  );

  preferredCriptoCurrencies.splice(criptoCurrencyIndex, 1);

  const preferredCriptoCurrenciesToString = JSON.stringify([
    ...new Set(preferredCriptoCurrencies),
  ]);

  await AsyncStorage.setItem(
    PREFERRED_CRIPTO_CURRENCIES_KEY,
    preferredCriptoCurrenciesToString,
  );
};
