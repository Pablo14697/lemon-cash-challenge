// React
import { useContext, useEffect, useState } from 'react';

// React Native
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Context
import { CriptoCurrencyContext } from '../../../../providers/CriptoCurrencyProvider/CriptoCurrencyProvider';

// Assets
import { BackArrow, Hearth, HearthPressed } from './assets';

// Utils
import {
  setPreferredCriptoCurrencies,
  removePreferredCriptoCurrencies,
  getPreferredCriptoCurrencies,
} from './utils/preferredCurrencyStorage';

// Types
import { CriptoCurrencyInfoType } from '../../../../types/CriptoCurrency';

const Header = () => {
  const navigation = useNavigation();
  const { criptoCurrencyInfo } = useContext(CriptoCurrencyContext);
  const [isPreferred, setIsPreferred] = useState(false);

  const handleIsPreferred = async () => {
    setIsPreferred(!isPreferred);
    if (!isPreferred) {
      await setPreferredCriptoCurrencies(criptoCurrencyInfo);
    } else {
      return await removePreferredCriptoCurrencies(criptoCurrencyInfo);
    }
    await fetchIsPreferred();
  };

  const fetchIsPreferred = async () => {
    const preferredCriptoCurrencies = await getPreferredCriptoCurrencies();
    const isPreferred = preferredCriptoCurrencies?.some(
      (criptoCurrency: CriptoCurrencyInfoType) =>
        criptoCurrency.id === criptoCurrencyInfo.id,
    );
    setIsPreferred(isPreferred);
  };

  useEffect(() => {
    fetchIsPreferred();
  }, [criptoCurrencyInfo.id]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fafafa',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 60,
          paddingLeft: 10,
          paddingRight: 20,
          borderBottomWidth: 0.2,
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ width: '10%', justifyContent: 'center' }}>
          <Image source={BackArrow} style={{ height: 25, width: 25 }} />
        </Pressable>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontFamily: 'NeueMontreal-Medium', fontSize: 16 }}>
            {criptoCurrencyInfo.symbol}
          </Text>
          <Text
            style={{
              fontFamily: 'NeueMontreal-Medium',
              color: '#888888',
              fontSize: 14,
            }}>
            {criptoCurrencyInfo.name}
          </Text>
        </View>
        <Pressable
          onPress={handleIsPreferred}
          style={{
            width: '20%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View
            style={{
              padding: 5,
              backgroundColor: '#f5f5f5',
              borderRadius: 15,
            }}>
            <Image
              source={isPreferred ? HearthPressed : Hearth}
              style={{ height: 30, width: 30 }}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;
