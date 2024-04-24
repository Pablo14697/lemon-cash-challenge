// React
import { useContext, useEffect, useState } from 'react';

// React Native
import { Image, Pressable, SafeAreaView, View } from 'react-native';

// Styles
import styles from './styles';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Context
import { CryptoCurrencyContext } from '../../../../providers/CryptoCurrencyProvider/CryptoCurrencyProvider';

// Assets
import { BackArrow, Hearth, HearthPressed } from './assets';

// Utils
import {
  setPreferredCryptoCurrencies,
  removePreferredCryptoCurrencies,
  getPreferredCryptoCurrencies,
} from '../../../../utils/preferredCurrencyStorage';

// Types
import { CryptoCurrencyInfoType } from '../../../../types/CryptoCurrency';
import { Typography } from '../../../../components';

const Header = () => {
  const navigation = useNavigation();
  const { cryptoCurrencyInfo } = useContext(CryptoCurrencyContext);
  const [isPreferred, setIsPreferred] = useState(false);

  const handleIsPreferred = async () => {
    setIsPreferred(!isPreferred);
    if (!isPreferred) {
      const { ...rest } = cryptoCurrencyInfo;
      await setPreferredCryptoCurrencies(rest);
    } else {
      return await removePreferredCryptoCurrencies(cryptoCurrencyInfo);
    }
    await fetchIsPreferred();
  };

  const fetchIsPreferred = async () => {
    const preferredCryptoCurrencies = await getPreferredCryptoCurrencies();
    const isPreferred = preferredCryptoCurrencies?.some(
      (cryptoCurrency: CryptoCurrencyInfoType) =>
        cryptoCurrency.id === cryptoCurrencyInfo.id,
    );
    setIsPreferred(isPreferred);
  };

  useEffect(() => {
    fetchIsPreferred();
  }, [cryptoCurrencyInfo.id]);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={BackArrow} style={styles.backIcon} />
        </Pressable>
        <View style={styles.centerContainer}>
          <Typography fontSize={16} fontWeight="medium">
            {cryptoCurrencyInfo.symbol}
          </Typography>
          <Typography fontSize={14} fontWeight="medium" color="mediumGray">
            {cryptoCurrencyInfo.name}
          </Typography>
        </View>
        <Pressable onPress={handleIsPreferred} style={styles.preferredButton}>
          <View style={styles.preferredBackgroundButton}>
            <Image
              source={isPreferred ? HearthPressed : Hearth}
              style={styles.preferredIcon}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;
